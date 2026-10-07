# PB-003D — BOB Guidance & Accessibility Foundation

## Build Specification v1.0

Status: Proposed specification pending review and approval  
Parent Blueprint: Approved PB-003D BOB Guidance & Accessibility Foundation Blueprint v1.0  
Parent Decisions: Approved PB-003D BOB Guidance & Accessibility Foundation Design Decisions v1.0  
Implementation Status: Not authorized

## 1. Document Boundary

This specification defines a future inspectable implementation slice for consistent, visual-first BOB guidance on existing student experiences. The slice does not implement audio or speech. It preserves the conceptual Read-Aloud contract for a later separately inspected and authorized technology decision.

This document does not authorize implementation, application or test changes, new guidance-content ownership, authoritative data, speech capability, AI, providers, APIs, models, routes, storage, tracking, personalization, teacher monitoring, or adapters.

Before implementation, a separate read-only inspection must verify the exact existing rendering owners, modification surface, protected behavior, and test boundary. Approval of this specification does not bypass that inspection.

## 2. Controlling References

- Approved PB-003D BOB Guidance & Accessibility Foundation Blueprint v1.0
- Approved PB-003D BOB Guidance & Accessibility Foundation Design Decisions v1.0
- PB-003 Student Dashboard Experience Blueprint v1.0
- PB-003 Student Dashboard Design Decisions v1.0
- Platform Blueprint v1.0
- Development Standards v1.0
- Approved PI-000 privacy, identity, governance, and persistence architecture

If this specification conflicts with a controlling reference or requires an unresolved PI-000 authority, work stops for reconciliation.

## 3. Build Objective

Create a consistent visual guidance foundation that helps students understand:

1. Where they are.
2. What the current page is for.
3. Which visible, already-authorized choices are available.
4. What a safe next step may be.

The first slice standardizes factual visible guidance on existing Student Home, Mission Choice, and My STEM Work experiences without creating new routes, interactions, authoritative records, progress meaning, or audio capability.

## 4. Included Scope

The future implementation may include only:

- A reusable visual BOB guidance presentation pattern within the existing Platform application architecture.
- One bounded factual guidance region on each authorized location listed in Section 6.
- Existing-route page orientation and short purpose wording.
- Existing-state guidance for Continue, Start, Coming Later, empty, unavailable, and recoverable error presentation where those states already exist.
- Semantic headings, labels, descriptions, and status meaning for the guidance region.
- Visual hierarchy, wrapping, reflow, focus safety, reduced-motion protection, and Chromebook-responsive presentation.
- Honest no-audio behavior: no enabled Read-Aloud control until a separately approved technology exists.
- Focused automated tests for the visual guidance contract.
- Regression tests protecting PB-001 through PB-003C, Builder, and Workshop.

No guidance string may claim new facts or capabilities. Exact student-facing wording and its content approval must be confirmed during the required inspection or a separately approved content decision before implementation.

## 5. Explicit Exclusions

Do not implement or add:

- Speech synthesis, recorded narration, audio assets, playback code, or audio services.
- Speech recognition, microphones, recording, transcription, voice commands, voiceprints, speaker identification, or voice analysis.
- AI, chatbot behavior, generative guidance, recommendations, adaptive sequencing, sentiment analysis, or autonomous actions.
- Personalization, reading-level inference, disability or accommodation profiles, student-support profiles, or persistent preferences.
- Guidance-use, audio-use, replay, completion, dwell-time, engagement, behavior, or support analytics.
- New student data, fixtures, authoritative records, data models, storage, session keys, cache ownership, or persistence.
- Guidance-content authoring, teacher editing, monitoring, reporting, impersonation, or individual usage visibility.
- New routes, pages, authentication behavior, role behavior, navigation destinations, frameworks, dependencies, APIs, providers, adapters, or backend systems.
- Mission launch, project launch, progress, completion, evidence connection, credits, badges, grades, praise, teacher review, or availability logic.
- Builder or Workshop integration or modification.
- Google or other external integrations.
- Student Display, Smart Board, public presentation, or classroom-broadcast guidance.
- Autoplay, forced tutorials, automatic navigation, required audio, or hidden prompts.

## 6. BOB Guidance Locations

### 6.1 Student Home

The existing Student Home may present one short BOB guidance region that:

- Identifies Student Home using approved student-safe language.
- Orients the student to the existing page hierarchy.
- Points toward visible existing choices without opening or selecting one.
- Does not claim that goals, wins, challenges, reflections, missions, or projects exist when their authoritative data is unavailable.
- Preserves the existing noninteractive BOB Welcome behavior unless a separately approved change is required.

### 6.2 Mission Choice

The existing Mission Choice experience may present one short BOB guidance region that:

- Explains the visible difference between Continue and Start.
- Preserves Continue-first behavior when the existing presentation shows a verified current-work state.
- Explains Coming Later, empty, and unavailable states honestly.
- Does not create mission availability, launch behavior, assignment logic, work identity, or progress.
- Does not enable currently disabled interactions.

### 6.3 My STEM Work

The existing My STEM Work experience may present one short BOB guidance region that:

- Explains the existing Current, Recent, Previous, and Future Path presentation categories.
- Preserves the approved student-first hierarchy and empty-state language.
- Does not claim that work is saved, resumable, complete, connected, or reviewed without authoritative evidence.
- Does not create projects, evidence, persistence, or environment handoff behavior.

### 6.4 Location Limits

- No other route or surface is included.
- Guidance must not appear on teacher routes, authentication screens, Student Display, Builder, or Workshop.
- A future location requires separate inspection and approval.
- Route or authorization changes invalidate guidance associated with the prior context.

## 7. Visual Guidance System

### Structure

Each included page may contain at most one primary BOB guidance region in the initial slice. The region must have:

- A recognizable BOB identity consistent with existing approved presentation.
- A semantic heading or accessible label.
- One concise purpose or orientation message.
- Optional concise state explanation only when grounded in existing visible state.
- No input field, conversation history, prompt box, or autonomous control.

### Hierarchy

- The page title and purpose precede detailed choices.
- Guidance supports the page hierarchy and must not visually overpower the actual student choices.
- One likely next existing action may be emphasized by the page, but BOB does not choose it.
- Other authorized choices remain visible and discoverable.
- Enabled, disabled, Coming Later, empty, unavailable, and error states remain visibly and semantically distinct.

### Visual Rules

- Text labels accompany icons.
- Meaning does not rely on color, icon, sound, animation, size, or position alone.
- Guidance follows the page's logical reading order.
- Text wraps and reflows without clipping, truncation, overlap, or horizontal scrolling.
- Guidance supports browser zoom and text resizing.
- Reduced-motion preferences are respected; no guidance meaning depends on animation.
- No hover-only information or action is permitted.

## 8. Read-Aloud Foundation

### Current Slice

Read-Aloud remains conceptual and unavailable by default. This specification does not authorize:

- An enabled Read-Aloud, Stop, Replay, Pause, or Resume control.
- A disabled control that falsely promises a feature.
- Speech or playback code.
- Technology or provider inspection as part of implementation.

Visible guidance must be complete without audio.

### Future Contract

If a later separately authorized technology and build specification implement Read-Aloud, it must remain:

- Optional and student-initiated.
- Limited to currently visible, approved, student-safe guidance.
- Immediately stoppable.
- Replayable after stopping or completion.
- Nonessential to navigation or work.
- Non-tracking and non-persistent unless a later approved decision explicitly authorizes narrowly bounded session state.
- Safe on route change, refresh, sign-out, authorization loss, interruption, unsupported environments, and unavailable dependencies.
- Free of microphone access, speech recognition, recording, transcription, voiceprints, voice analysis, AI, or personalization.

The future technology, states, controls, and ownership require a separate read-only inspection and approval. Nothing in this specification preselects them.

## 9. Student Control Boundaries

For this visual-only slice, students may:

- Read or ignore guidance.
- Navigate using existing authorized controls.
- Leave the page without completing a tutorial or acknowledging guidance.

Students cannot use BOB to:

- Change identity, classroom membership, teacher controls, mission availability, project/work state, evidence, progress, or permissions.
- Unlock disabled or future features.
- Access another student's information.
- Enter prompts or create persistent preferences or profiles.

Use, non-use, focus, or time near guidance has no progress, grading, behavior, reading, ability, eligibility, or support meaning.

## 10. Teacher Control Boundaries

PB-003D creates no teacher-facing control.

Teachers cannot:

- Edit or publish BOB guidance through this slice.
- Activate guidance while impersonating or acting as a student.
- Control an individual student's guidance or future private playback session.
- View whether an individual student read, focused, dismissed, started, stopped, completed, replayed, or declined guidance.
- Receive support-use analytics, reading or disability inferences, student speech, recordings, transcripts, voiceprints, or attempted-speech metadata.

Teacher-authored or classroom-wide guidance requires a separate owner, privacy review, product decision, specification, and approval.

## 11. Privacy Requirements

- Collect no new student data.
- Create no guidance-use, focus, dismissal, audio-use, reading-level, disability, behavioral, or support record.
- Do not record, transmit, retain, or process microphone input.
- Do not create transcripts, voiceprints, voice-derived identifiers, speaker identification, voice analysis, microphone-derived inference, or attempted-speech metadata.
- Do not send student guidance, identity, class context, missions, projects, evidence, or usage to an external service.
- Do not expose raw identifiers, credentials, class codes, private teacher information, or another student's information.
- Use only currently authorized student-safe presentation state already available to the existing page.
- Do not turn DOM content, page labels, fixtures, browser state, or session state into an authoritative record.
- Preserve PI-000 ownership, authorization, data-minimization, lifecycle, persistence, and adapter boundaries.

## 12. Accessibility Requirements

### Semantics

- Use semantic headings, regions, descriptions, controls, and status text.
- The BOB guidance region has an accessible name tied to its visible purpose.
- Status wording is available to assistive technology without repetitive or disruptive announcements.
- Icon alternatives and text labels communicate equivalent meaning.

### Keyboard and Focus

- Existing interactive elements remain fully keyboard operable.
- Guidance introduces no empty, disabled, or hidden focus target.
- Focus order continues to match visual and reading order.
- Guidance never steals focus on page load or state update.
- Focus remains visible and is never trapped.

### Readability and Reflow

- Maintain readable contrast.
- Support browser zoom and text resizing.
- Wrap and reflow text without clipping, truncation, overlap, detached labels, or horizontal scrolling.
- Avoid fixed-height assumptions that hide guidance.
- Do not require audio, color perception, motion, hover, fine pointer precision, or timed response.
- Respect reduced-motion preferences.

### Language and Dignity

- Use concise, concrete, age-appropriate wording.
- Avoid technical language, blame, shame, urgency, or childish presentation.
- Support non-readers and emerging readers through universal clarity without labeling or profiling them.

## 13. Chromebook Requirements

Physical Chromebook validation must verify:

- Student Home, Mission Choice, and My STEM Work guidance appears only on the correct authorized routes.
- Guidance is readable at normal zoom and with browser text enlargement.
- Text wraps and reflows without clipping, overlap, truncation, or horizontal scrolling.
- Keyboard and touchpad navigation remain usable.
- Focus order and visible focus remain correct.
- Existing controls retain at least their approved Chromebook interaction size.
- Reduced-motion behavior is respected.
- No hover, touchscreen, microphone, personal account, high bandwidth, or audio availability is required.
- Refresh, route change, sign-out, and shared-device cleanup preserve authorization and expose no stale student context.
- Empty, unavailable, and error guidance remains calm and accurate.
- No console errors, repeated rendering, layout instability, or noticeable slowdown occurs.

No audio-control validation applies to this visual-only slice. Any later audio implementation requires the full start, stop, completion, repeat, focus, interruption, unsupported, unavailable, refresh, and sign-out validation contract from the approved PB-003D decisions.

## 14. Testing Requirements

### Focused Automated Tests

Verify:

- Guidance renders only on Student Home, Mission Choice, and My STEM Work.
- Teacher and entry routes do not render PB-003D student guidance.
- Each included page contains no more than one primary BOB guidance region.
- Guidance uses approved static presentation inputs and creates no fabricated mission, project, progress, evidence, or review state.
- Mission Choice guidance preserves Continue-first, Start, Coming Later, empty, and disabled presentation behavior.
- My STEM Work guidance preserves Current, Recent, Previous, Future Path, and approved empty-state behavior.
- No enabled or disabled audio control, microphone control, prompt input, or conversation surface is introduced.
- No new session key, storage write, fixture owner, network request, analytics hook, or external dependency is introduced.
- Semantic labels and headings are present.
- No new unreachable or misleading interaction exists.

### Accessibility Verification

Verify:

- Logical heading and reading order.
- Keyboard operation and visible focus for surrounding existing controls.
- No focus theft or focus trap.
- Meaning does not rely on color, icon, motion, or audio alone.
- Text enlargement and reflow preserve all guidance.
- Reduced-motion settings do not remove meaning.
- Student-friendly labels remain clear in empty, unavailable, and error states.

### Regression Tests

Run:

- All Platform tests.
- PB-001 authentication, roles, routing, refresh, and sign-out tests.
- PB-002 Teacher Command Center, timer, memo, and Student Display tests.
- PB-003A Student Home tests.
- PB-003B Mission Choice tests.
- PB-003C My STEM Work tests.
- Existing Workshop regression tests.
- Available Builder regression or smoke tests without modifying Builder.

### Browser and Physical Verification

- Inspect Student Home, Mission Choice, and My STEM Work at supported Chromebook widths.
- Verify teacher routes and student-route protection.
- Verify no horizontal overflow, console errors, stale context, or duplicate guidance.
- Complete the physical Chromebook checklist in Section 13.
- Perform Builder and Workshop smoke tests.

## 15. Protected Systems

Do not modify or break:

- PB-001 authentication, account shells, student entry, roles, route guards, refresh restoration, or sign-out cleanup.
- PB-002 Teacher Command Center, timer, timer adjustment, memo, Student Display, presentation modes, or session cleanup.
- PB-003A Student Home structure, data boundaries, or noninteractive BOB Welcome behavior beyond the separately inspected visual guidance insertion.
- PB-003B Mission Choice hierarchy, Continue-first behavior, state meanings, disabled interactions, or data boundaries.
- PB-003C My STEM Work hierarchy, state meanings, empty states, evidence placeholders, or data boundaries.
- PI-000 ownership, identity, authorization, governance, privacy, persistence, recovery, or adapter contracts.
- Builder runtime, mission behavior, geometry, camera, navigation, save/load, persistence, assets, or canonical content.
- Workshop rendering, geometry, Table, Grid, camera, View controls, measurement, Tool Chest, Smart Board, Projector, mission restoration, screenshots, persistence, assets, or canonical content.
- Existing routes, session keys, fixtures, dependencies, assets, or storage behavior.

## 16. Implementation Stop Conditions

Stop before or during implementation when:

- Exact file and rendering ownership has not been confirmed by read-only inspection.
- Approved student-facing wording or content ownership is unavailable.
- Any guidance statement would require fabricated, inferred, stale, or unauthorized data.
- A new route, storage key, fixture, dependency, provider, API, model, adapter, backend, or authoritative record would be required.
- Audio, speech, microphone, recording, transcription, voiceprints, voice analysis, AI, personalization, analytics, tracking, or teacher monitoring enters scope.
- An enabled or misleading Read-Aloud control would be introduced.
- Guidance would interrupt choice, navigate automatically, hide authorized options, or claim progress, completion, review, praise, or authority.
- A required PI-000 authority or owner is unavailable or `UNASSIGNED`.
- Accessibility, wrapping, reflow, reduced-motion, focus, error, privacy, or Chromebook behavior cannot be verified.
- PB-001 through PB-003C, Builder, Workshop, or PI-000 requires an unauthorized change.
- Unrelated files would need modification.

When stopped, report the exact requirement, owner, decision, inspection, or approval needed. Do not invent a workaround.

## 17. Definition of Done

PB-003D is complete only when:

- The required pre-implementation repository inspection passes.
- The implementation remains within the approved visual-only slice.
- Student Home, Mission Choice, and My STEM Work contain the approved bounded guidance presentation.
- Visual guidance is factual, concise, accessible, and understandable without audio.
- No audio or speech technology, AI, tracking, personalization, new data, route, storage, provider, API, dependency, or adapter is added.
- Student and teacher control boundaries are preserved.
- Privacy requirements pass inspection.
- Focused automated and accessibility checks pass.
- Full Platform regression tests pass.
- Builder and Workshop regressions or smoke tests pass.
- Physical Chromebook validation passes.
- Final implementation inspection passes.
- The user provides explicit final approval.

No commit, tag, push, release, or completion claim is permitted until separately authorized under the Development Standards.

## 18. Required Completion Report

After any future implementation, report:

- Files created and modified.
- Exact guidance locations and approved wording source.
- Architecture and privacy boundaries preserved.
- Focused, accessibility, regression, and smoke tests performed.
- Physical Chromebook validation result.
- Known limitations and deferred audio behavior.
- Confirmation that no excluded technology or data collection was added.
- Commit and version status.

## 19. Next Required Gate

After specification review and explicit approval, conduct a separate read-only PB-003D pre-implementation repository inspection. Do not implement from this specification until that inspection passes and implementation is separately authorized.
