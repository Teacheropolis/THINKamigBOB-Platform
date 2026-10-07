# PB-003D — BOB Guidance & Accessibility Foundation

## Design Decisions v1.0

Status: Proposed design decisions pending review and approval  
Parent Blueprint: PB-003D — BOB Guidance & Accessibility Foundation Blueprint v1.0  
Implementation Status: Not authorized

## Document Boundary

These decisions define the product and interaction contract for a future BOB guidance and accessibility foundation. They do not implement or select speech synthesis, speech recognition, microphone access, recording, transcription, voiceprints, voice analysis, AI, personalization, analytics, tracking, providers, APIs, models, storage, routes, dependencies, or adapters.

Each implementation step requires a separate read-only inspection, approved build specification, automated and regression testing, physical Chromebook validation, and explicit authorization. No decision in this document automatically authorizes the next stage.

## Controlling References

- Approved PB-003D BOB Guidance & Accessibility Foundation Blueprint v1.0
- Approved PB-003A through PB-003C student experience architecture
- Existing visible BOB and Read-Aloud design boundaries
- Platform Blueprint v1.0
- Development Standards v1.0
- Approved PI-000 privacy, identity, governance, and persistence architecture

If these decisions conflict with a controlling reference, work stops for reconciliation.

## Decision 1 — BOB Is a Bounded Guidance Layer

### Decision

BOB explains verified visible context and approved choices. BOB is not an authority, evaluator, autonomous assistant, decision-maker, tutor, counselor, grader, teacher substitute, or authoritative data owner.

### Allowed Guidance

BOB may:

- Identify the current student-facing page and its purpose.
- Explain visible choices using approved static wording.
- Clarify factual Continue, Start, Coming Later, empty, unavailable, and error states.
- Point to an existing authorized action without activating it.
- Repeat approved guidance without changing its meaning.

### Prohibited Guidance

BOB must not:

- Generate missions, recommendations, praise, feedback, goals, evidence, grades, or judgments.
- Infer progress, completion, reading level, disability, ability, attention, emotion, intent, or support need.
- Change identity, membership, permissions, availability, project/work state, evidence, or teacher-controlled state.
- Claim teacher review or approval without authoritative evidence.
- Hide authorized choices, force a sequence, or manufacture urgency.

## Decision 2 — Visual Guidance Is Primary

### Decision

Every essential instruction, status, warning, and next step must be understandable through visible text and semantic structure without audio.

### Requirements

- Page title and purpose appear before detailed choices.
- The likely next approved action may receive visual priority, but other authorized choices remain discoverable.
- Text labels remain present when icons are used.
- Color, motion, sound, iconography, size, and position never carry essential meaning alone.
- Visible wording remains accurate when audio is muted, unavailable, interrupted, unsupported, or denied.
- No enabled control promises guidance that is not available.

## Decision 3 — Guidance Moments Are Explicitly Bounded

### Approved Conceptual Moments

Future specifications may select from these moments only:

1. Student Home entry and class orientation.
2. Mission Choice Continue-versus-Start explanation.
3. My STEM Work Current, Recent, Previous, and Future Path explanation.
4. Honest empty, unavailable, and recoverable error states.
5. Verified Platform orientation after returning from an approved work environment.

### Trigger Boundaries

- Guidance appears only on an authorized student route and in its approved visible context.
- Ordinary visible guidance may appear with the page; optional audio requires a separate student action.
- Guidance never opens Builder, Workshop, a mission, project, evidence item, or another route automatically.
- Guidance does not interrupt typing, selection, navigation, or work.
- A route, authorization, or context change invalidates guidance tied to the prior context.
- New moments require separate product review and cannot be added because implementation makes them convenient.

## Decision 4 — Student Interaction Lifecycle

### Initiation

- The student initiates optional support through a clearly labeled control when that control is separately authorized and available.
- Initiation is never inferred from login, page load, focus, hover, inactivity, reading time, or prior use.
- Audio never autoplays.

### Dismissal and Stop

- The student may dismiss visible supplemental guidance without completing a tutorial.
- The student may stop optional reading immediately.
- Stop remains reachable by keyboard and touchpad while reading is active.
- Route change, sign-out, loss of authorization, or invalidated context stops reading safely.

### Completion and Replay

- Completion is a playback state only; it is not mission, project, activity, or learning completion.
- After completion or stopping, the student may replay the same approved visible guidance through a clear student action.
- Replay must not create usage history, persistent tracking, analytics, or a student support profile.

### Focus

- Starting support does not move focus unexpectedly away from the initiating control unless a separately approved accessible interaction requires it.
- Stop, completion, interruption, unavailable, and replay states retain or restore focus predictably.
- Focus never enters hidden or unavailable controls.

## Decision 5 — Read-Aloud Remains Optional and Conceptual

### Decision

Read-Aloud is a possible student-controlled accessibility aid for reading currently visible, approved, student-safe guidance. It is not conversation, speech recognition, adaptive tutoring, AI, or a substitute for visible text.

### Conceptual Behavior

- Student-initiated only.
- Immediately stoppable.
- Replayable after stop or completion.
- Limited to the meaning of currently visible approved guidance.
- Nonessential to completing any Platform task.
- Safely unavailable when support cannot be verified.
- Cleared from any future session-only playback state at sign-out or authorization loss without deleting authoritative records.

### Not Selected or Authorized

- Speech synthesis or recorded narration.
- A provider, browser feature, service, voice, API, model, format, audio asset, cache, or dependency.
- Pause, resume, speed, voice selection, word highlighting, or persistent preferences.
- Microphone access, speech recognition, recording, transcription, voice commands, voiceprints, or voice analysis.

## Decision 6 — Non-Reader and Emerging-Reader Support Preserves Dignity

### Decision

Support is available through universally clear design rather than student labeling or inferred ability.

### Requirements

- Use short, concrete, age-appropriate visible phrases.
- Pair familiar icons with text.
- Use consistent placement, grouping, labels, and interaction patterns.
- Give each section one clear purpose.
- Avoid technical vocabulary, unexplained symbols, and dense instructions.
- Do not require a teacher-applied reading or disability label.
- Do not create reading-level, disability, accommodation, or support-use records.
- Do not simplify or personalize content for a student based on inferred ability.
- Avoid childish presentation that compromises student dignity.

## Decision 7 — Visual Navigation Uses Guided Choice Without Manipulation

### Decision

The interface may emphasize the most relevant verified action while preserving access to every other authorized option.

### Pattern Rules

- Preserve the approved Continue-first hierarchy when verified current work exists.
- Distinguish Continue, Start, Coming Later, unavailable, and empty states in text and presentation.
- Maintain a predictable top-to-bottom and left-to-right reading order appropriate to the layout.
- Use one visually dominant action per bounded context unless the approved experience requires equal choices.
- Never fabricate data or enable a false interaction to avoid an empty state.
- Never use shame, countdown pressure, loss framing, or hidden defaults to manipulate choice.
- Never require hover, audio, fine pointer precision, or a timed response.

## Decision 8 — Student Control Boundaries

### Students May

- Use or ignore optional support.
- Start, stop, dismiss, and replay authorized guidance.
- Continue using the visible interface without audio.
- Navigate among currently authorized choices.

### Students May Not Through BOB

- Change classroom membership, distribution, mission availability, or teacher controls.
- Create or change authoritative project, progress, evidence, or identity state.
- Access another student's information.
- Unlock future or unavailable features.
- Create persistent audio, reading, personalization, or support profiles.

Use or non-use of support has no grading, progress, behavioral, or eligibility meaning.

## Decision 9 — Teacher Control and Impersonation Are Prohibited

### Decision

PB-003D creates no teacher guidance editor, monitoring panel, assignment control, or reporting surface.

Teachers must not:

- Activate student guidance while impersonating or acting as a student.
- Start, stop, dismiss, replay, or otherwise control an individual student's private playback session.
- View whether an individual student started, stopped, completed, replayed, or declined optional guidance.
- Receive reading-level, disability, support-need, attention, audio-use, engagement, or behavior inferences.
- Receive student speech, recordings, transcripts, voiceprints, attempted-speech metadata, or audio analytics.
- Disable a student's ability to stop optional audio or use the visible interface without audio.

Any future teacher-authored classroom guidance requires separate ownership, privacy, product, accessibility, and implementation decisions.

## Decision 10 — No Tracking, Recording, or Speech-Derived Data

### Decision

PB-003D collects no new student data and creates no guidance-use record.

### Prohibitions

- No recording, transmission, retention, or processing of microphone input.
- No transcripts or attempted-speech metadata.
- No voiceprints, voice-derived identifiers, speaker identification, or voice analysis.
- No microphone-derived inference about identity, reading, ability, emotion, attention, health, behavior, or environment.
- No audio-use, replay, completion, dwell-time, engagement, or support analytics.
- No cross-student exposure.
- No external transmission of student text, identity, classroom context, missions, projects, evidence, or usage.
- No persistence of support preferences or playback history under this decision.

Any future data processing requires separate approval under PI-000, including assigned product, privacy, security, school-operations, legal/district where applicable, and technical authority. Those authorities remain `UNASSIGNED`.

## Decision 11 — Accessibility Semantics and Interaction

### Semantic Structure

- Use semantic page titles, headings, regions, labels, controls, and status messages.
- Accessible names match the visible control purpose.
- State changes are announced without repetitive interruption.
- Disabled, Coming Later, unavailable, selected, active, stopped, completed, and error states have distinguishable semantic meaning.

### Keyboard and Focus

- Every authorized control is keyboard operable.
- Focus order follows the visual and reading order.
- Focus is always visible and never trapped.
- Start, stop, completion, interruption, unavailable, and replay behavior preserves or restores predictable focus.
- No information or action is hover-only.

### Zoom, Wrapping, and Reflow

- Text resizing and browser zoom preserve content and operation.
- Text wraps without clipping, truncation, overlap, or horizontal overflow.
- Reflow does not detach labels, descriptions, status, or errors from their controls.
- Meaning does not depend on fixed card height or one-line text.

### Motion and Audio States

- Reduced-motion preferences are respected.
- Meaning and control state never depend on animation.
- Audio state is visible and programmatically determinable when audio is separately authorized.
- Surprise sound, flashing, and unnecessary motion are prohibited.

## Decision 12 — Chromebook Validation Is Physical and Explicit

Any future implementation requires physical validation on the supported Chromebook environment for:

- Student routes and verified class context.
- Keyboard and touchpad operation.
- Logical tab order and visible focus.
- Minimum 44px targets for authorized controls.
- Browser zoom, text enlargement, wrapping, reflow, and absence of horizontal scrolling.
- Reduced-motion behavior.
- Start, stop, completion, repeat, unavailable, and interrupted control states.
- Focus behavior before, during, and after each audio-control state.
- Repeated activation without duplicate playback or tracking.
- Muted sound, unsupported audio, interruption, permission denial, refresh, route change, sign-out, and shared-device cleanup.
- No dependency on a touchscreen, microphone, personal account, high bandwidth, or audio availability.
- PB-001 through PB-003C regression behavior.
- Builder and Workshop smoke tests.

Desktop testing does not replace physical Chromebook validation.

## Decision 13 — Error and Unavailable States Fail Safely

### Required States

- **Ready:** Approved guidance is visible; conceptual support could be initiated if separately implemented and available.
- **Active:** Approved visible guidance is being read.
- **Stopped:** The student stopped reading and may replay.
- **Complete:** Reading ended and may be replayed; no learning or work completion is implied.
- **Interrupted:** Context, system, or browser interruption stopped reading safely.
- **Unsupported:** The required future capability is not supported in the current environment.
- **Unavailable:** Support cannot be offered or verified safely.

### Behavior

- Every state retains complete visible guidance.
- Errors use calm student-facing language and expose no internal IDs or private information.
- Unsupported and unavailable are not silently treated as success.
- Retry or replay occurs only after a student action.
- Failure never blocks navigation, work, sign-out, or use of the visible interface.
- Refresh does not automatically restart audio.
- Stale context is discarded rather than narrated.

The exact implementation state model remains deferred.

## Decision 14 — Protected Systems Remain Unchanged

PB-003D must not change:

- PB-001 authentication, roles, route guards, refresh restoration, or sign-out cleanup.
- PB-002 Teacher Command Center, timer, memo, Student Display, or presentation modes.
- PB-003A Student Home and noninteractive BOB Welcome behavior.
- PB-003B Mission Choice, Continue-first behavior, honest availability, or Guided Choice boundaries.
- PB-003C My STEM Work, hierarchy, empty states, or evidence placeholders.
- PI-000 ownership, identity, authorization, governance, privacy, persistence, or adapter boundaries.
- Builder runtime, mission behavior, geometry, navigation, save/load, persistence, or assets.
- Workshop rendering, geometry, Table, Grid, camera, measurement, Tool Chest, Smart Board, Projector, mission restoration, screenshots, persistence, or assets.
- Existing routes, sessions, fixtures, dependencies, or approved assets.

BOB guidance cannot be used to work around a missing authoritative owner or unavailable integration.

## Decision 15 — Deferred Decisions Remain Non-Authorizing

The following remain deferred:

- The first implementation slice and exact included guidance moments.
- Exact approved guidance wording and its content owner.
- Whether Read-Aloud proceeds after inspection.
- Speech or audio technology and provider selection, if separately authorized.
- Playback implementation, lifecycle, and permitted controls.
- Language and translation boundaries.
- Session-only state, if any.
- Teacher-authored guidance, if ever proposed.
- External service, consent, permission, retention, logging, audit, and adapter ownership.
- Testing technology and compatibility support policy.

No deferred decision may be inferred from current browser behavior, fixtures, files, tools, conversations, or technical availability.

## Implementation Stop Conditions

Stop documentation advancement or implementation planning when:

- A required product, privacy, accessibility, security, school-operations, legal/district, technical, content, or adapter authority is unavailable or `UNASSIGNED`.
- Visible guidance wording or ownership is not approved.
- A guidance moment exceeds the bounded list without separate review.
- Audio would autoplay, become essential, or continue after invalidated context.
- A control would promise unavailable support.
- Reading would include hidden, stale, unauthorized, or cross-student content.
- Recording, transcription, microphone input, voiceprints, voice analysis, personalization, analytics, tracking, or AI would enter scope.
- A provider, API, model, format, route, storage system, dependency, or adapter would need to be selected without a separate gate.
- Keyboard, focus, zoom, wrapping, reflow, reduced-motion, error, or Chromebook behavior is undefined.
- PB-001 through PB-003C, PI-000, Builder, or Workshop would require modification outside explicit authorization.
- Implementation would infer progress, authority, identity, availability, or student need.

When blocked, report the exact decision, authority, inspection, and approval required.

## Approval Meaning

Approval of these decisions means only that the product and interaction boundaries are accepted for a future inspection and specification stage.

Approval does not:

- Implement or enable BOB interaction or Read-Aloud.
- Select speech technology, a provider, API, model, voice, format, route, storage, dependency, or adapter.
- Authorize recording, transcription, microphone access, voiceprints, voice analysis, personalization, analytics, tracking, AI, or data collection.
- Authorize application or test changes.
- Unblock any PI-000 authority, ownership, persistence, or integration decision.

## Next Required Gate

After review and explicit approval, conduct a separate read-only PB-003D implementation-readiness inspection only if separately authorized. No build specification or implementation begins automatically.
