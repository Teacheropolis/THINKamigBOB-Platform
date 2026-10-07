# PB-003D — BOB Guidance & Accessibility Foundation

## Design Blueprint v1.0

Status: Proposed blueprint pending review and approval  
Parent Experience: PB-003 — Student Dashboard Experience  
Implementation Status: Not authorized

## Document Boundary

This blueprint defines a student guidance and accessibility foundation for helping students understand where they are, what information matters, and what approved action they may take next.

It defines product intent and boundaries only. It does not implement BOB interaction, audio, speech synthesis, speech recognition, recording, personalization, AI, analytics, new routes, storage, integrations, or data collection. Any implementation requires a separate inspection, approved design decisions, reviewed build specification, automated and regression testing, physical Chromebook validation, and explicit authorization.

PB-003D preserves PB-001 through PB-003C, the approved PI-000 architecture, Builder, Workshop, and existing visible BOB guidance. It does not reinterpret existing presentation shells, mission choice, My STEM Work, ownership contracts, or protected work environments.

## Purpose

BOB should help students answer three calm questions:

1. Where am I?
2. What can I do here?
3. What is a safe next step?

The guidance layer should reduce reading and navigation barriers while preserving student agency. Visible structure is primary. Optional audio may support visible approved guidance in a future authorized build, but the experience must never depend on audio.

## Foundation Principles

### Guidance, Not Control

BOB may clarify approved choices and make a likely next action easy to find. BOB must not force a path, hide other authorized choices, manufacture urgency, or claim authority belonging to a teacher, mission, project/work owner, or another system.

### Visible First

Every essential instruction, state, warning, and next step must exist in visible text or an equivalent non-audio presentation. Audio, animation, color, icons, and position may reinforce meaning but may not carry essential meaning alone.

### Student-Initiated Support

Optional assistance begins only after a clear student action. It must not autoplay, listen in the background, interrupt work, or require a student to disclose why support is wanted.

### Honest State

BOB may present only verified Platform state and approved static guidance. It must not invent progress, availability, success, teacher review, recommendations, or personalized judgments.

### Minimal Burden

Guidance should use short language, familiar patterns, clear hierarchy, and forgiving navigation. Students should not need to complete a tutorial, configure a profile, remember hidden gestures, or understand technical terms.

## BOB Purpose and Boundaries

### BOB May

- Welcome the student using approved, class-safe visible wording.
- Identify the current page and its purpose.
- Explain visible choices in plain language.
- Distinguish Continue, Start, Coming Later, unavailable, empty, and error states.
- Point toward an existing authorized action without launching it automatically.
- Offer optional Read-Aloud for approved visible guidance after separate implementation approval.
- Repeat or restate approved guidance without changing its meaning.
- Provide calm recovery wording when an action or dependency is unavailable.

### BOB Must Not

- Act as a chatbot, tutor, counselor, grader, evaluator, or teacher substitute.
- Generate or recommend missions, projects, evidence, goals, grades, praise, or feedback.
- Infer reading level, disability, attention, emotion, ability, intent, or support need.
- Listen to, transcribe, record, classify, or respond to student speech.
- Ask open-ended questions or accept conversational prompts.
- Make decisions for the student or teacher.
- Change mission availability, progress, work identity, evidence, classroom membership, or permissions.
- Claim that a teacher reviewed or approved something without authoritative evidence.
- expose internal identifiers, private credentials, or another student's information.

BOB presentation is not an authoritative owner under PI-000.

## Student Guidance Moments

Guidance may be considered at these bounded moments:

### Entry and Orientation

- Confirm that the student has reached their authorized Student Home.
- Show the current class context using approved student-safe labels.
- Explain the page's primary purpose in one short visible message.
- Avoid setup questions, preference collection, or forced onboarding.

### Choosing a Path

- Explain the difference between continuing current work and starting an available activity.
- Preserve the approved Continue-first hierarchy without hiding other authorized choices.
- Identify Coming Later and unavailable choices honestly.
- Never fabricate mission or project data to make the experience appear populated.

### Viewing My STEM Work

- Clarify Current, Recent, Previous, and Future Path presentation meanings.
- Explain honest empty states without implying failure or missing effort.
- Avoid claiming that a displayed project is saved, resumable, complete, or reviewed unless its authoritative owner confirms that state.

### Empty, Unavailable, and Error States

- Say what is known in calm, student-friendly language.
- Provide an existing safe recovery action when one is authorized.
- Avoid blame, raw error details, hidden retry loops, or false success.
- Keep navigation out of the state available.

### Returning from Work

- Restore only verified authorized Platform context.
- Do not infer progress or completion from opening, closing, or returning from Builder or Workshop.
- Do not alter Builder or Workshop state.

New guidance moments require separate product review. This blueprint does not authorize adding BOB to every screen.

## Read-Aloud Foundation

Read-Aloud is an optional, student-controlled accessibility aid for approved visible guidance. It is not conversation, speech recognition, adaptive tutoring, or AI.

### Required Behavior Boundary

- Audio never starts automatically.
- A clearly labeled student control initiates reading.
- The student can stop reading immediately.
- After reading completes or is stopped, the student may replay the same approved visible guidance through a clear student action.
- Starting, stopping, completing, or replaying guidance must not create usage history, persistent tracking, or a student support profile.
- Reading stops safely when context changes, the student signs out, or protected content is no longer authorized.
- Narration matches the meaning of the currently visible approved guidance.
- Essential information remains visible and usable while audio is muted, unavailable, interrupted, unsupported, or denied.
- Read-Aloud failure never blocks navigation or student work.
- No hidden page, student, class, project, mission, or evidence data is included in narration.

### Not Authorized by This Blueprint

- A visible enabled Read-Aloud control
- Browser speech synthesis
- Recorded narration
- Backend or external voice services
- Voice selection
- Reading-speed controls
- Pause or resume behavior
- Word or sentence highlighting
- Persistent audio preferences
- Automatic continuation across pages
- Speech recognition or microphone access

These capabilities require separate inspection and approval. An implementation must not display a control that falsely promises unavailable support.

## Visual Navigation Rules

- Use a consistent page title, short purpose statement, and obvious primary region.
- Follow a predictable top-to-bottom reading order.
- Make the most relevant approved action easiest to find without hiding alternatives.
- Use descriptive text labels; icons supplement rather than replace labels.
- Use color, size, shape, position, and wording together instead of color alone.
- Clearly distinguish enabled, disabled, Coming Later, empty, unavailable, and selected states.
- Keep buttons and links visually recognizable and consistent across Student experiences.
- Avoid dense paragraphs, ambiguous cards, unexplained symbols, and competing primary actions.
- Never require hover to discover information or controls.
- Preserve browser zoom, text resizing, keyboard focus, and logical focus order.

## Accessibility Principles

- Provide semantic headings, regions, labels, controls, and status messages.
- Maintain readable contrast and visible keyboard focus.
- Use plain, concrete, age-appropriate language without talking down to students.
- Keep instructions short and place them near the relevant choice.
- Provide equivalent meaning without requiring audio, color perception, fine pointer control, or timed response.
- Avoid flashing, unnecessary motion, sensory overload, and surprise audio.
- Preserve student control over optional support.
- Announce meaningful state changes accessibly without repeatedly interrupting assistive technology.
- Keep errors specific, recoverable, and free of private technical details.

Accessibility support must not require disclosure of disability, diagnosis, reading level, or accommodation status.

## Non-Reader and Emerging-Reader Support

The experience should support students who cannot yet independently read all interface text without labeling or tracking them as a special group.

The foundation may use:

- Short visible phrases.
- Familiar, consistent icons paired with text.
- Strong grouping and spatial consistency.
- One clear purpose per section.
- Concrete action labels such as `Continue Current Work`.
- Optional student-initiated reading of approved visible guidance in a future authorized build.
- Repeatable navigation patterns that do not depend on memorizing written instructions.

The foundation must not:

- Infer or store a reading level.
- Publicly identify a student as needing reading support.
- Automatically simplify content for a specific student.
- Require teacher labeling before support is available.
- Replace instructional content with icons alone.
- Use childish imagery or language that compromises dignity.

## Student Control Boundaries

Students may:

- Choose whether to use optional guidance support when implemented and authorized.
- Start and stop optional Read-Aloud.
- Navigate among currently authorized Platform choices.
- Continue without audio.
- Leave a guidance state without completing a tutorial.

Students may not through BOB:

- Change classroom membership or teacher controls.
- Unlock unavailable missions or features.
- Change authoritative project, progress, evidence, or distribution state.
- Access another student's information.
- Configure unapproved persistent profiles or speech preferences.

No student choice in this layer may be interpreted as reading ability, engagement, behavior, or performance evidence.

## Teacher Control Boundaries

Teachers may eventually control approved classroom-facing guidance content only through separately authorized workflows and authoritative owners.

Teachers must not receive:

- Lists of students who used or did not use Read-Aloud.
- Reading-level or disability inferences.
- Audio-use analytics.
- Hidden engagement or attention scores.
- Student speech, recordings, or transcripts.
- Automated judgments about who needs support.

Teachers must not activate student guidance while impersonating or acting as a student, control an individual student's private playback session, or view whether an individual student started, stopped, completed, or replayed optional guidance.

Teachers must not be required to activate ordinary accessibility support for individual students. Teacher controls must not override a student's ability to stop optional audio or use the visible interface without audio.

This blueprint does not create teacher guidance-editing, monitoring, assignment, or reporting controls.

## Privacy Requirements

- Collect no new student data under this blueprint.
- Create no guidance-use, audio-use, reading-level, disability, speech, or behavioral record.
- Do not record, transmit, or retain microphone input.
- Do not create or retain voiceprints, voice-derived identifiers, transcripts, microphone-derived inferences, or metadata derived from attempted speech input.
- Do not send student text, identity, class context, projects, missions, evidence, or usage to an external service.
- Do not expose private identifiers, class codes, raw IDs, credentials, or another student's information.
- Read only currently visible, authorized, student-safe guidance if a future implementation is approved.
- Clear any future session-only playback state at sign-out and authorization loss without deleting authoritative records.
- Apply PI-000 ownership, authorization, persistence, retention, and source-adapter boundaries before any external dependency is considered.

Any data processing, external service, telemetry, persistence, or personalization requires separate product, privacy, security, school-operations, legal/district where applicable, and technical approval. Those authorities remain unassigned in the current PI-000G-A register.

## Chromebook Requirements

Any future implementation must be validated physically on the supported Chromebook environment for:

- Readable layout without horizontal scrolling.
- Clear hierarchy at normal zoom and with browser text enlargement.
- Text wraps without clipping, truncation, overlap, or horizontal overflow at supported Chromebook sizes and zoom levels.
- Keyboard and touchpad operation.
- Minimum 44px interactive targets where controls are authorized.
- Visible focus and logical tab order.
- Reduced-motion preferences are respected; guidance meaning and control state never depend on motion.
- No hover-only actions.
- If audio controls are separately authorized, physical validation covers visible focus and understandable state for start, stop, completion, and repeat, including repeated keyboard and touchpad operation.
- Calm behavior with muted sound, unavailable audio, denied permissions, interrupted playback, refresh, route change, and sign-out.
- No slowdown that blocks navigation or work.
- No dependency on microphone, touchscreen, high bandwidth, or a personal account.
- Correct protection of teacher routes, student routes, sessions, and shared-device cleanup.

Physical Chromebook validation remains mandatory and cannot be replaced by desktop testing.

## Future Speech Technology Considerations

No speech technology is selected or recommended by this blueprint.

Before any technology decision, a separate read-only inspection must determine:

- Supported Chromebook and browser behavior.
- Whether processing is local, external, or unavailable; no approach is preferred here.
- Student-data and visible-text transmission boundaries.
- Account, consent, permission, and legal/district requirements.
- Voice consistency and comprehensibility.
- Offline and intermittent-connectivity behavior.
- Start, stop, interruption, route-change, refresh, and sign-out behavior.
- Overlapping playback prevention.
- Accessibility semantics and assistive-technology interaction.
- Failure and honest-unavailable presentation.
- Security, privacy, retention, logging, and audit implications.
- Testing and regression boundaries.

Provider, API, browser feature, voice, audio asset, data format, storage, caching, telemetry, and fallback selections remain deferred. Speech recognition is outside this foundation.

## Protected Systems

PB-003D must preserve:

- PB-001 authentication shells, roles, route guards, refresh restoration, and sign-out cleanup.
- PB-002 Teacher Command Center, timer, memo, and Student Display behavior.
- PB-003A Student Home layout and noninteractive BOB Welcome foundation.
- PB-003B Mission Choice, Continue-first hierarchy, honest availability, and Guided Choice boundaries.
- PB-003C My STEM Work hierarchy, empty states, and presentation-only evidence foundations.
- Approved PI-000 ownership, identity, authorization, governance, privacy, persistence, and adapter boundaries.
- Builder runtime, missions, geometry, navigation, save/load, and assets.
- Workshop rendering, geometry, camera, measurement, Table, Grid, Tool Chest, Smart Board, Projector, mission restoration, screenshots, persistence, and assets.
- Existing visible BOB and Read-Aloud design boundaries.

## Explicit Exclusions

PB-003D does not authorize:

- Application or test changes.
- Speech synthesis, recorded narration, audio assets, playback code, or speech services.
- Speech recognition, microphone access, recording, transcription, or voice commands.
- Voiceprints, voice-derived identifiers, microphone-derived inference, attempted-speech metadata, or transcript creation.
- AI, chatbot, generative guidance, recommendations, adaptive sequencing, or sentiment analysis.
- Personalization profiles, reading-level models, disability records, or accommodation tracking.
- Audio analytics, engagement analytics, surveillance, behavior monitoring, or teacher reports.
- New missions, mission launch, progress tracking, credits, badges, rewards, or grades.
- Builder or Workshop integration or modification.
- Google or other external integration.
- New backend, database, API, provider, framework, route, storage, session key, fixture, dependency, or data model.
- Changes to teacher controls, Student Display, public presentation, or classroom broadcasting.
- Automatic navigation, forced tutorials, autoplay, or required audio.

## Deferred Decisions

- Exact guidance moments included in a first implementation slice.
- Exact approved visible wording and content ownership.
- Whether Read-Aloud proceeds after inspection.
- Technology and provider selection, if separately authorized.
- Playback lifecycle, control set, and interruption behavior.
- Whether any session-only preference is necessary and permissible.
- Language support and translation boundaries.
- Teacher-authored guidance, if ever proposed.
- External service, consent, retention, logging, and audit behavior.
- Ownership of any future speech or audio adapter.

No deferred decision may be inferred during design or implementation.

## Blueprint Acceptance Criteria

PB-003D is ready for review when it:

- Defines BOB as guidance rather than authority or intelligence.
- Identifies bounded student guidance moments.
- Preserves visible text as the primary experience.
- Defines Read-Aloud conceptually without selecting or implementing technology.
- Supports non-readers and emerging readers without labeling or surveillance.
- Preserves student agency and teacher boundaries.
- Defines privacy, accessibility, Chromebook, and failure requirements.
- Protects PB-001 through PB-003C, PI-000, Builder, and Workshop.
- Records explicit exclusions and deferred decisions.
- Creates no new data, authority, integration, or implementation authorization.

## Next Required Gate

After blueprint review and explicit approval, create separate PB-003D design decisions only if authorized. No build specification, inspection for technology selection, or implementation may begin automatically.
