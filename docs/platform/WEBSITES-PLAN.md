# Websites Plan

Status: Proposed trial plan  
Area: Teacher-shared resources and Student Home

## Goal

Let a student open a teacher-approved outside webpage in a large framed workspace without losing their place in THINKamigBOB.

## Student Experience

1. A teacher shares a website through the existing webpage library or custom webpage field.
2. The website appears in **Today’s Activities** on Student Home.
3. The student selects **Open Activity**.
4. THINKamigBOB opens a full-size website viewer over the student dashboard.
5. The viewer keeps a simple platform bar visible with:
   - **Back to Student Home**
   - The activity title
   - **Open in New Tab**
6. Closing the viewer returns the student to the same place on Student Home.

## Viewer Layout

The viewer should use nearly the full Chromebook screen. The outside webpage appears inside a protected frame below a short THINKamigBOB header. The student should never be trapped inside the outside page or need the browser Back button to return.

## Teacher Experience

The existing webpage-sharing workflow remains the source of access. A teacher can:

- Choose a website from the private teacher webpage library.
- Add a custom secure website address.
- Assign it to the whole class, selected students, or a group.
- Remove it from Student Home when it is no longer needed.

The first trial should add an opening preference:

- **Automatic** — use the framed viewer and always provide a new-tab option.
- **New tab only** — skip the framed viewer for a site known not to support it.

`Automatic` should be the default.

## Safety Rules

- Accept only secure `https` addresses, plus approved internal platform paths.
- Allow framing only for teacher-approved resources.
- Use a restricted iframe sandbox and grant only capabilities required by the activity.
- Do not pass THINKamigBOB session details, student identifiers, or classroom information to the outside site.
- Keep navigation controls outside the framed page.
- Display the real destination domain so teachers and students can recognize where the content comes from.
- Keep **Open in New Tab** available because some websites block framing or require their own browser context.

## Trial Scope

The first classroom trial should stay deliberately small:

1. Build the framed viewer for the existing Student Home activity cards.
2. Test it with three to five teacher-selected public websites.
3. Include one site that allows framing and one that requires the new-tab path.
4. Verify keyboard use, touchpad use, small Chromebook screens, loading behavior, and return-to-home behavior.
5. Record compatibility by domain before adding a site to the teacher webpage library.

The trial does not need browsing, unrestricted student-entered addresses, pop-up windows inside the frame, activity tracking, or claims that a student completed work on the outside site.

## Compatibility Behavior

Outside sites control whether they may appear inside another website. When a known site blocks embedding, THINKamigBOB should label it **Opens in a new tab** before the student selects it.

For an untested site, the viewer should show a short loading state and keep the new-tab option visible. The interface must not promise that every outside website can be displayed inside the platform.

## Success Criteria

The trial is successful when:

- A student can open a compatible teacher-shared website without leaving Student Home.
- The student can return with one clear action.
- A blocked or incompatible website still opens through the new-tab fallback.
- Students cannot open an unassigned address through the viewer.
- No private platform or student information is exposed to the outside website.
- The experience works at common school Chromebook sizes without horizontal scrolling.

## Recommended Build Order

1. Add the student website-viewer shell and return controls.
2. Connect existing teacher-shared webpage cards to the viewer.
3. Add URL validation and the iframe safety policy.
4. Add the teacher opening preference and compatibility labels.
5. Add automated tests for authorization, safe URLs, fallback behavior, and student navigation.
6. Run the small classroom compatibility trial before expanding the approved website catalog.

