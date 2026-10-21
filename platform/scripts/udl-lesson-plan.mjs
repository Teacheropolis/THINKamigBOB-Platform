export const UDL_LESSON_PLAN_STORAGE_KEY = "thinkamigbob.udl-lesson-plans.v1";

export const OHIO_STANDARDS_3_6 = Object.freeze([
  { id: "3-PS-Forces", grade: 3, subject: "Science", code: "Grade 3 Physical Science", text: "Explain and predict changes in an object's motion using evidence about forces." },
  { id: "3-LS-Traits", grade: 3, subject: "Science", code: "Grade 3 Life Science", text: "Use observations and evidence to describe life cycles, traits, and survival." },
  { id: "3-MD-5", grade: 3, subject: "Mathematics", code: "3.MD.C.5–7", text: "Understand area as an attribute and solve problems involving area." },
  { id: "3-ID", grade: 3, subject: "Technology", code: "Innovative Designer · Grades 3–5", text: "Use a deliberate design process to generate ideas, test solutions, and improve artifacts." },
  { id: "4-PS-Energy", grade: 4, subject: "Science", code: "Grade 4 Physical Science", text: "Investigate energy transfer and use evidence to explain changes in a system." },
  { id: "4-ESS-Surface", grade: 4, subject: "Science", code: "Grade 4 Earth and Space Science", text: "Use evidence to explain processes that shape Earth's surface." },
  { id: "4-MD-3", grade: 4, subject: "Mathematics", code: "4.MD.A.3", text: "Apply area and perimeter formulas to solve real-world problems." },
  { id: "4-ID", grade: 4, subject: "Technology", code: "Innovative Designer · Grades 3–5", text: "Use a deliberate design process to generate ideas, test solutions, and improve artifacts." },
  { id: "5-PS-Matter", grade: 5, subject: "Science", code: "Grade 5 Physical Science", text: "Use measurements and observations to explain changes and conservation of matter." },
  { id: "5-LS-Systems", grade: 5, subject: "Science", code: "Grade 5 Life Science", text: "Develop and use models to explain interactions within ecosystems." },
  { id: "5-NBT-7", grade: 5, subject: "Mathematics", code: "5.NBT.B.7", text: "Perform operations with decimals to solve real-world problems." },
  { id: "5-ID", grade: 5, subject: "Technology", code: "Innovative Designer · Grades 3–5", text: "Use a deliberate design process to generate ideas, test solutions, and improve artifacts." },
  { id: "6-PS-Matter", grade: 6, subject: "Science", code: "Grade 6 Physical Science", text: "Use particle models and evidence to explain properties and changes of matter." },
  { id: "6-LS-Cells", grade: 6, subject: "Science", code: "Grade 6 Life Science", text: "Use evidence and models to explain how cells and body systems support life." },
  { id: "6-RP-3", grade: 6, subject: "Mathematics", code: "6.RP.A.3", text: "Use ratio and rate reasoning to solve real-world problems." },
  { id: "6-ID", grade: 6, subject: "Technology", code: "Innovative Designer · Grades 6–8", text: "Use an iterative design process, data, and feedback to develop and improve solutions." },
]);

const clean = (value, length = 4000) => String(value ?? "").trim().slice(0, length);
const blank = () => ({ grade: "", description: "", standardIds: [], objective: "", successCriteria: "", assessmentType: "", assessmentEvidence: "", representation: "", engagement: "", expression: "", savedAt: 0 });

export function createUdlLessonPlanStore(storage) {
  const readAll = () => { try { return JSON.parse(storage.getItem(UDL_LESSON_PLAN_STORAGE_KEY) || "{}"); } catch { return {}; } };
  const read = (classId) => ({ ...blank(), ...(readAll()[classId] || {}) });
  const save = (classId, input = {}) => {
    const all = readAll();
    all[classId] = { grade: ["3", "4", "5", "6"].includes(String(input.grade)) ? String(input.grade) : "", description: clean(input.description), standardIds: [...new Set((input.standardIds || []).filter((id) => OHIO_STANDARDS_3_6.some((item) => item.id === id)))], objective: clean(input.objective, 500), successCriteria: clean(input.successCriteria, 800), assessmentType: ["formative", "summative"].includes(input.assessmentType) ? input.assessmentType : "", assessmentEvidence: clean(input.assessmentEvidence, 800), representation: clean(input.representation, 800), engagement: clean(input.engagement, 800), expression: clean(input.expression, 800), savedAt: Date.now() };
    storage.setItem(UDL_LESSON_PLAN_STORAGE_KEY, JSON.stringify(all));
    return all[classId];
  };
  return Object.freeze({ read, save });
}

export function lessonPlanSuggestions(plan, context = {}) {
  const suggestions = [];
  if (!plan.description) suggestions.push("Add a short lesson description so the purpose is clear.");
  if (!plan.standardIds?.length) suggestions.push("Select at least one Ohio standard and confirm it matches the intended learning.");
  if (!plan.objective) suggestions.push("Add a measurable learning objective using an observable student action.");
  if (!plan.successCriteria) suggestions.push("Describe what successful student work will show.");
  if (!context.hasDoNow) suggestions.push("Create a Do Now that activates prior knowledge or reveals an initial misconception.");
  if (!context.hasSteps) suggestions.push("Add at least one sequential lesson step with an activity choice.");
  if (!plan.assessmentType) suggestions.push("Label the lesson evidence as formative or summative.");
  if (!plan.assessmentEvidence) suggestions.push("Name the student evidence the teacher will review.");
  if (!plan.representation) suggestions.push("Add a representation option such as a model, visual, demonstration, vocabulary support, or read-aloud.");
  if (!plan.engagement) suggestions.push("Add an engagement option such as meaningful choice, collaboration, relevance, or a clear goal.");
  if (!plan.expression) suggestions.push("Add an action/expression option such as writing, speaking, drawing, building, or demonstrating.");
  if (!context.hasExitTicket) suggestions.push("Select a Captain's Log prompt that checks the objective at the end of the lesson.");
  return suggestions;
}
