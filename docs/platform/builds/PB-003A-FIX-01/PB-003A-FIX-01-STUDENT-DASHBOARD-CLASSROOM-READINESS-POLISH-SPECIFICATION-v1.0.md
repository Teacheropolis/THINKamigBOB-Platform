# PB-003A-FIX-01 — Student Dashboard Classroom Readiness Polish Specification v1.0

**Document Status:** Proposed specification pending review and approval  
**Implementation Status:** Blocked and not authorized  
**Operation Type:** Documentation only

## Purpose

Define a bounded classroom-readiness polish contract for the existing Student Dashboard foundations. The future implementation may improve first-week comprehension, visual reading order, readability, spacing, grouping, and consistency without adding features, data, routes, state, persistence, or integrations.

No standalone authoritative Classroom Readiness Sprint document was found during preparation. The sprint scope supplied with this request is planning context only and does not override approved Platform architecture or grant implementation authority.

## References

- PB-003A Student Home Experience Blueprint, Build Specification, implementation, and tests
- PB-003B Mission Choice Experience Blueprint, Design Decisions, Build Specification, implementation, and tests
- PB-003C My STEM Work Experience Blueprint, Build Specification, approved refinements, implementation, and tests
- PB-003D BOB Guidance & Accessibility Foundation approved documentation and implementation-readiness review
- Platform Blueprint v1.0
- Development Standards v1.0
- Applicable approved PI-000 ownership, identity, privacy, persistence, and governance contracts
- The supplied Classroom Readiness Sprint scope as non-authoritative planning context

## Build Objective

Polish the existing student-facing dashboard so a student can understand its established sequence and honest unavailable states on a Chromebook during first-week classroom use.

The protected conceptual flow is:

1. Welcome
2. Today’s Goal
3. Choose Your Path
4. My STEM Work

This sequence describes the intended reading hierarchy. It does not approve renaming the current **Current Goal** label, changing routes, adding navigation, or selecting final student-facing copy.

## Included Scope

Only the following categories may be considered in a later, separately authorized implementation:

- Refinement of existing student-facing wording after final copy approval.
- Visual hierarchy among existing Student Home, Mission Choice, and My STEM Work content.
- Chromebook readability, reflow, and scanability improvements.
- Spacing and grouping changes within the existing layout.
- Consistent presentation of existing buttons and button states; no button may be added, removed, enabled, or repurposed by this specification.
- Consistent treatment of existing icons; no icon, asset, or meaning is selected here.
- Honest empty-state clarity without invented data or implied functionality.
- Visual reading-order and grouping improvements within the existing Student Dashboard route.
- Existing layout polish using the current Platform architecture and namespaces.

## Explicit Exclusions

This specification does not authorize:

- New missions or fabricated mission examples.
- Mission Distribution.
- Mission launch, assignment, availability, tracking, or progress behavior.
- Read-Aloud implementation or any enabled or disabled Read-Aloud control.
- Audio wording, speech synthesis, speech recognition, microphone access, voice input, voice analysis, chatbot behavior, or prompts.
- AI functionality or personalized recommendations.
- Analytics, student tracking, support profiles, hidden personalization, or teacher surveillance.
- New navigation, routes, links, destinations, or launch behavior.
- New state, session keys, storage, persistence, fixtures, or data owners.
- New projects, evidence, progress, review status, student records, or examples.
- Builder, Workshop, Google, or other integrations.
- New dependencies, assets, providers, APIs, models, adapters, or technologies.
- Production governance, ownership, privacy, lifecycle, or authority changes.
- Changes to Teacher Command Center or Student Display behavior.

## Student Wording Standards

Future candidate wording must:

- Use short, concrete, age-appropriate sentences.
- Explain what is available now without promising future availability or timing.
- Distinguish **Continue** from **Start** without implying either action currently works when it does not.
- Avoid technical, administrative, grading, deficit-based, or surveillance language.
- Avoid implying that missions, projects, evidence, progress, or reviews exist when authoritative data is unavailable.
- Preserve student dignity and choice.
- Remain understandable without icons, color, audio, hover, or prior Platform knowledge.
- Use consistent terms across Student Home, Mission Choice, and My STEM Work.

This specification does not select exact replacement copy. Current exact-text contracts remain protected until candidate copy is reviewed and approved with the necessary test-alignment scope.

## Visual Hierarchy Rules

- The page must communicate the protected flow: Welcome → Today’s Goal → Choose Your Path → My STEM Work.
- Hierarchy must be created with semantic headings, reading order, spacing, grouping, typography, and restrained visual emphasis.
- Visual order and DOM order must remain aligned.
- Continue-first behavior and the approved PB-003C student-choice hierarchy must remain intact.
- Existing content may not be reordered in a way that changes approved meaning or ownership.
- No color or icon may be the only way to communicate meaning or state.
- Decorative icons must be hidden from assistive technology; meaningful icons require an accessible text equivalent.
- Icon style, size, and placement must be consistent if existing icons are retained.
- Existing controls with equivalent roles must have consistent visual treatment, target size, focus behavior, and state communication.
- Layout polish must not create carousels, hidden panels, horizontal card rails, modal flows, or new interaction patterns.

## Navigation Flow Boundary

“Navigation flow improvements” means only visual reading order, grouping, orientation, and consistent presentation inside the existing Student Dashboard experience.

It does not authorize:

- A new route or route transition.
- A new link, button, tab, menu, breadcrumb, or destination.
- Automatic movement, scrolling, focus transfer, or launch behavior.
- Changes to student or teacher route guards.

## Honest Empty-State Requirements

Every empty or unavailable state must:

- State truthfully that content or an action is unavailable now.
- Avoid fabricated student, mission, project, evidence, progress, or review information.
- Avoid suggesting an action the student cannot complete.
- Avoid blame, failure language, urgency, ranking, or comparison.
- Avoid promises about when a future capability will arrive.
- Preserve the distinction among empty, unavailable, disabled, and coming-later meanings.
- Remain understandable in context without color or icon interpretation.

Final empty-state wording is unresolved and requires separate content approval. This specification defines qualities and boundaries only.

## Compatibility and Protected Test Contracts

The existing PB-003A, PB-003B, PB-003C, and PB-003C-FIX tests protect exact text, counts, section order, semantic structure, noninteractive states, and visual distinctions. They are compatibility boundaries, not disposable snapshots.

A future build may alter a protected expectation only when all of the following are true:

1. The exact proposed behavior or copy has been approved.
2. A pre-implementation repository inspection identifies the affected contract.
3. Application and focused-test changes are authorized together.
4. The test is updated to assert the approved behavior rather than weakened or removed.
5. Full regressions confirm PB-003A through PB-003D remain protected.

PB-003D’s boundary remains controlling: this slice must expose no Read-Aloud control, including a nonfunctional or disabled control, and must contain no audio, microphone, voice, chatbot, or speech prompt wording.

## Privacy and Data Requirements

- Use only information already authorized for the current student session and presentation.
- Add no student data, examples, identifiers, analytics, history, profiles, or tracking.
- Do not infer readiness, progress, interests, reading ability, support needs, or future choices.
- Do not transmit information externally.
- Do not expose teacher-only, other-student, roster, or classroom-private information.
- Preserve approved PI-000 ownership and authorization boundaries.

## Accessibility Requirements

A future implementation must verify:

- Correct heading hierarchy and landmark relationships.
- Logical DOM, visual, keyboard, and assistive-technology reading order.
- Visible focus that is not clipped or obscured.
- Existing controls remain keyboard operable and retain clear accessible names and states.
- A minimum 44-by-44 CSS-pixel target for applicable interactive controls.
- Text and essential interface contrast meet approved Platform standards.
- Content remains readable at 200% zoom and reflows at 400% zoom without loss or two-dimensional scrolling, except where inherently necessary.
- Text wraps without clipping, overlap, truncation, or horizontal overflow.
- Status and empty-state meaning does not rely on color, icon, position, motion, or audio alone.
- Reduced-motion preferences are respected.
- Touch, touchpad, keyboard, and assistive use receive equivalent information.

## Chromebook Requirements

Physical Chromebook validation must confirm:

- The complete protected flow is apparent without horizontal scrolling.
- Primary headings, labels, and empty states are readable at classroom Chromebook dimensions.
- Spacing and grouping remain clear at default zoom and supported zoom levels.
- Long approved text wraps without overlap or clipping.
- Existing interactive targets are easy to reach with keyboard, touchpad, and touch where applicable.
- Focus indicators remain visible during keyboard navigation.
- Disabled or unavailable foundations cannot be mistaken for enabled actions.
- No hover-only information or interaction is required.
- No unexpected focus movement, scroll jump, slowdown, or stale presentation occurs after refresh.

## Anticipated Implementation Surface — Not Authorized

Repository inspection confirms the current student experience is rendered within `studentDashboardView(state)` in `platform/scripts/platform-app.mjs`, with namespaced presentation in `platform/styles/platform.css`, and protected by focused tests under `tests/platform/`.

These are candidate boundaries for a later pre-implementation inspection, not approved files for modification. Exact files, selectors, text, icons, controls, and test changes must be identified and approved at that gate. A future authorized build would also require focused PB-003A-FIX-01 tests and implementation notes.

## Focused Testing Requirements

Future focused tests must verify the exact approved polish contract, including:

- Protected section presence and reading order.
- Approved wording and honest-state meanings after copy approval.
- No fabricated mission, project, evidence, progress, review, or student data.
- No new route, navigation behavior, interaction, state, storage, fixture, dependency, or integration.
- Existing disabled and noninteractive foundations remain honest.
- Button and icon semantics remain accessible and consistent where existing elements are affected.
- No Read-Aloud/audio/speech/microphone/voice/chatbot/prompt UI or wording.
- Namespaced styles and no horizontal overflow.
- Keyboard order, focus visibility, semantic headings, wrapping, zoom, contrast, reduced motion, and target sizing.
- Student and teacher role separation remains intact.

Tests must assert approved behavior. They must not be weakened merely to accommodate changed markup or copy.

## Regression Requirements

Before any future approval, run and pass:

- The full Platform test suite.
- PB-001 authentication, routing, refresh, sign-out, and role protection.
- PB-002 Teacher Command Center, timer, memo, and Student Display regressions.
- PB-003A, PB-003B, PB-003C, and applicable PB-003D regressions.
- Builder smoke tests.
- The full Workshop regression suite and smoke tests.

## Browser Validation

Supported-browser inspection must verify:

- Student login and protected Student Dashboard access.
- The established dashboard flow and hierarchy.
- Honest unavailable and empty states.
- No new enabled actions or navigation.
- Keyboard order and visible focus.
- Zoom, text reflow, wrapping, contrast, reduced motion, and responsive breakpoints.
- Refresh and sign-out behavior remain unchanged.
- No console errors or horizontal scrolling.

## Physical Chromebook Validation

Physical validation is mandatory after implementation and automated inspection. It must cover:

- Student login and route protection.
- Welcome, goal, Mission Choice, and My STEM Work comprehension.
- Default zoom, 200% zoom, and practical reflow checks.
- Keyboard, touchpad, and applicable touch interaction.
- Focus order, focus visibility, wrapping, target size, spacing, grouping, and icon/text equivalence.
- Honest disabled, empty, unavailable, and coming-later distinctions.
- Refresh and sign-out protection.
- PB-001 through PB-003D regression checks.
- Builder and Workshop smoke tests.

Any confusing copy, clipped content, overflow, misleading affordance, stale state, slowdown, or privacy concern is a validation failure pending review.

## Protected Systems

The future work must preserve:

- PB-001 authentication, roles, routing, refresh, and sign-out behavior.
- PB-002 Teacher Command Center and Student Display behavior.
- PB-003A Student Home architecture and data boundaries.
- PB-003B Mission Choice architecture, Continue/Start meanings, and noninteractive foundation.
- PB-003C My STEM Work architecture, hierarchy, evidence foundation, and noninteractive states.
- PB-003D visual-first guidance, privacy, and no-Read-Aloud-control boundaries.
- Platform fixtures, session keys, storage, dependencies, routes, and assets.
- Builder and Workshop behavior and boundaries.
- Approved PI-000 ownership, privacy, lifecycle, persistence, and authority blocks.

## Remaining Decisions and Approval Gates

The following remain unresolved and are not decided by this specification:

- Final revised student-facing copy, including whether any current label changes.
- Whether any existing icons should change and which approved asset system would supply them.
- Whether any existing buttons require visual adjustment and the exact consistency standard.
- Exact spacing, typography, breakpoint, and grouping values.
- Exact implementation files and selectors after pre-implementation inspection.
- Exact focused-test updates required by approved copy or structure changes.
- Verified product/content, privacy, accessibility, and technical authority approvals required by PI-000.
- Whether the supplied Classroom Readiness Sprint has or will receive an authoritative repository document.

## Implementation Stop Conditions

Stop before implementation if:

- This specification has not passed review and explicit approval.
- The required product/content, privacy, accessibility, or technical authority is unassigned or unverified.
- Final copy, icons, button changes, or visual requirements would need to be invented.
- A change requires a new route, navigation behavior, state, storage, fixture, dependency, asset, integration, provider, API, model, or adapter.
- A change conflicts with an exact PB-003A/B/C test contract without explicit paired authorization.
- A change introduces any Read-Aloud control or audio/speech wording contrary to PB-003D.
- A change would alter Student Display, Builder, Workshop, or another protected system.
- Honest empty states cannot be maintained without fabricated data.

## Definition of Done

PB-003A-FIX-01 is complete only when:

- The specification has passed review and explicit approval.
- A separate read-only pre-implementation inspection identifies an exact bounded modification and test surface.
- Required authorities and final content decisions are verified and approved.
- A separate explicit build instruction authorizes the exact implementation.
- Only approved visual and wording polish is implemented.
- Focused and full regression tests pass.
- Browser validation passes.
- Physical Chromebook validation passes.
- Builder and Workshop remain protected.
- Final user approval is recorded.
- Commit and push remain separately authorized actions.

Approval of this specification alone does not satisfy the Definition of Done and does not authorize implementation.

## Exact Next Gate

`/REVIEW` — **PB-003A-FIX-01 Student Dashboard Classroom Readiness Polish Specification v1.0**
