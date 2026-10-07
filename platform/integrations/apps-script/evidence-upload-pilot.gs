const PILOT_FOLDER_ID = '1LEb7tIqisBKNEvtLhGGRpW3PKB8OIY74';
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

function safeSegment(value, fallback) {
  const normalized = String(value || '').trim().replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
  return normalized.slice(0, 80) || fallback;
}

function doGet() {
  return jsonResponse({ status: 'ready', destination: 'teacher-owned-drive', pilot: 'fictional-image-only' });
}

function doPost(event) {
  try {
    const request = JSON.parse(event.postData.contents || '{}');
    const expectedToken = PropertiesService.getScriptProperties().getProperty('UPLOAD_TOKEN');
    if (!expectedToken || request.uploadToken !== expectedToken) return jsonResponse({ ok: false, error: 'valid-upload-session-required' });
    if (request.action === 'list') return listEvidence();
    if (request.action === 'content') return evidenceContent(request.fileId);
    if (!ALLOWED_IMAGE_TYPES.includes(request.mimeType)) return jsonResponse({ ok: false, error: 'pilot-image-type-not-allowed' });
    const bytes = Utilities.base64Decode(request.dataBase64 || '');
    if (!bytes.length) return jsonResponse({ ok: false, error: 'empty-upload' });
    if (bytes.length > MAX_IMAGE_BYTES) return jsonResponse({ ok: false, error: 'upload-too-large' });
    const activity = safeSegment(request.activity, 'pilot-activity');
    const student = safeSegment(request.studentId, 'fictional-student');
    const originalName = safeSegment(request.fileName, 'evidence-image');
    const fileName = activity + '__' + student + '__' + Date.now() + '__' + originalName;
    const blob = Utilities.newBlob(bytes, request.mimeType, fileName);
    const file = DriveApp.getFolderById(PILOT_FOLDER_ID).createFile(blob);
    file.setDescription(JSON.stringify({ schemaVersion: 1, studentId: String(request.studentId || ''), activity: String(request.activity || ''), evidenceType: String(request.evidenceType || 'Photo') }));
    return jsonResponse({ ok: true, evidence: { id: file.getId(), name: file.getName(), mimeType: file.getMimeType(), size: file.getSize() } });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: 'drive-upload-failed' });
  }
}

function readEvidenceMetadata(file) {
  try {
    const value = JSON.parse(file.getDescription() || '{}');
    if (value.schemaVersion === 1) return value;
  } catch (error) {
    console.warn('Evidence metadata unavailable for ' + file.getId());
  }
  return { studentId: 'fictional-student', activity: 'Pilot evidence', evidenceType: 'Photo' };
}

function listEvidence() {
  const files = DriveApp.getFolderById(PILOT_FOLDER_ID).getFiles();
  const evidence = [];
  while (files.hasNext() && evidence.length < 100) {
    const file = files.next();
    if (!ALLOWED_IMAGE_TYPES.includes(file.getMimeType())) continue;
    const metadata = readEvidenceMetadata(file);
    evidence.push({ id: file.getId(), name: file.getName(), mimeType: file.getMimeType(), size: file.getSize(), savedAt: file.getDateCreated().toISOString(), studentId: metadata.studentId, activity: metadata.activity, evidenceType: metadata.evidenceType });
  }
  evidence.sort(function(a, b) { return b.savedAt.localeCompare(a.savedAt); });
  return jsonResponse({ ok: true, evidence: evidence });
}

function evidenceContent(fileId) {
  if (!fileId) return jsonResponse({ ok: false, error: 'evidence-id-required' });
  const file = DriveApp.getFileById(fileId);
  const parents = file.getParents();
  let belongsToPilotFolder = false;
  while (parents.hasNext()) if (parents.next().getId() === PILOT_FOLDER_ID) belongsToPilotFolder = true;
  if (!belongsToPilotFolder || !ALLOWED_IMAGE_TYPES.includes(file.getMimeType())) return jsonResponse({ ok: false, error: 'evidence-not-found' });
  const bytes = file.getBlob().getBytes();
  if (bytes.length > MAX_IMAGE_BYTES) return jsonResponse({ ok: false, error: 'upload-too-large' });
  return jsonResponse({ ok: true, evidence: { id: file.getId(), mimeType: file.getMimeType(), dataBase64: Utilities.base64Encode(bytes) } });
}
