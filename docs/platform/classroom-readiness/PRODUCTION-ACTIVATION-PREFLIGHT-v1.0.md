# Production Activation Preflight v1.0

## Purpose

This read-only check separates a complete software foundation from external services that still require setup. It never deploys Workers, creates databases, contacts Google, changes billing, or prints secret values.

## Run the safe local rehearsal

```sh
node scripts/check-production-readiness.mjs
```

The expected pre-staging result is:

- `Foundation: PASS`
- `Production activation: NOT READY (no deployment attempted)`

This is a successful rehearsal. It confirms that local and file previews remain disabled while identifying the remaining staging inputs.

## Prepare a private activation file

Copy `platform/integrations/cloudflare/production-activation.example.json` to `platform/integrations/cloudflare/production-activation.json`, then replace the placeholders after the published HTTPS origin, Google clients, and D1 databases exist. The private filename is ignored by Git.

Run:

```sh
node scripts/check-production-readiness.mjs --config=platform/integrations/cloudflare/production-activation.json
```

The checker looks only for the presence of these Worker secret environment names:

- `CLASSROOM_CODE_HASH_KEY`
- `GOOGLE_OAUTH_CLIENT_SECRET`
- `TOKEN_ENCRYPTION_KEY`

It does not read, validate, log, or persist their values. Real secrets should be added using the deployment platform's secret manager, never committed to the repository or pasted into the browser.

## Activation boundary

An `activationReady` result is permission to begin a separate private staging review. It is not permission to deploy publicly, enroll real students, enable billing, or connect a school Drive account. Those actions remain explicit later decisions.

## Generate private staging configuration

After filling the private activation file, run:

```sh
node scripts/generate-staging-configs.mjs
```

This writes three ignored, owner-readable Wrangler JSON files under `platform/integrations/cloudflare/.generated/staging/`. The private authentication Worker has no public route. Identity and Evidence receive separate API routes and both call authentication through a staging-only service binding. All three generated files retain `PRODUCTION_ENABLED: "false"`.

Generation performs no deployment, migration, secret update, network request, or billing action. The files must pass a later dry-run and explicit review before any staging deployment.

After generation, run the static bundle gate:

```sh
node scripts/check-staging-bundle.mjs
```

The gate resolves every Worker entrypoint and migration directory from the generated file location, confirms route separation and D1 isolation, rejects secret values in ordinary variables, and prints the required deployment review order. Wrangler is intentionally not invoked by this command.

After it passes, rerun it with `--write-evidence` to record its non-secret result for the activation gate.

## Read-only staging smoke test

After a separately approved disabled staging deployment, run:

```sh
node scripts/smoke-test-staging.mjs
```

The runner sends exactly two unauthenticated `GET` requests: Identity health and Evidence health. In disabled mode, both must return only `{ "ok": true, "productionReady": false }` with `no-store`, `nosniff`, and no cookie. It never signs in, creates a classroom, accesses Drive, uploads evidence, or sends credentials.

Only after a separately approved activation may the same read-only check use `--expect-enabled`. A failed or unexpectedly enabled response blocks the next step.

To record a passing disabled result locally for the activation gate, add `--write-evidence`. The resulting JSON contains only health status, readiness booleans, and a timestamp; it is stored under the ignored `.generated` directory.

## Create—not deploy—an activation candidate

After the disabled bundle gate, disabled smoke check, and staging secrets are complete, create a review candidate with:

```sh
node scripts/create-staging-activation-candidate.mjs --confirm="ENABLE PRIVATE STAGING ONLY"
```

The exact phrase is required. The command creates enabled copies under the ignored `staging-activated` directory and an activated copy of the platform HTML containing the public Google sign-in client ID. It does not modify `platform/index.html`, deploy Workers, apply migrations, contact Cloudflare or Google, or change billing. The checked-in source remains disabled.

## Prepare the rollback before activation

After creating an activation candidate—but before deploying it—create its matching rollback candidate:

```sh
node scripts/create-staging-rollback-candidate.mjs --confirm="PREPARE PRIVATE STAGING ROLLBACK"
```

The rollback candidate disables the browser entry and all three Workers while preserving database bindings, D1 records, Drive files, and secrets. It includes the safe rollback order: browser UI first, then public Identity and Evidence Workers, private Authentication Worker last, followed by the disabled smoke test. The command only writes ignored local review files; it performs no deployment or deletion.
