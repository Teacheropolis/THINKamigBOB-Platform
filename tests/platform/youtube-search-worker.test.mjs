import test from "node:test";
import assert from "node:assert/strict";
import { createYouTubeSearchWorker } from "../../platform/integrations/cloudflare/youtube-search-worker.mjs";

const env = { YOUTUBE_API_KEY: "server-secret", PLATFORM_ORIGIN: "https://teacheropolis.github.io" };
const request = (query = "fractions") => new Request(`https://api.example/api/youtube/v1/search?q=${encodeURIComponent(query)}`, { headers: { origin: env.PLATFORM_ORIGIN } });

test("YouTube search stays disabled until its server secret is configured", async () => {
  const response = await createYouTubeSearchWorker().fetch(request(), {});
  assert.equal(response.status, 503);
  assert.equal((await response.json()).error, "setup-required");
});

test("YouTube search enforces the platform origin and strict embeddable results", async () => {
  let requestedUrl;
  const worker = createYouTubeSearchWorker({ fetchImpl: async (url) => {
    requestedUrl = new URL(url);
    return Response.json({ items: [{ id: { videoId: "abc123XYZ" }, snippet: { title: "Fractions", channelTitle: "Learning Channel", thumbnails: { medium: { url: "https://img.example/thumb.jpg" } } } }] });
  } });
  assert.equal((await worker.fetch(new Request("https://api.example/api/youtube/v1/search?q=fractions", { headers: { origin: "https://wrong.example" } }), env)).status, 403);
  const response = await worker.fetch(request(), env);
  assert.equal(response.status, 200);
  assert.equal(requestedUrl.searchParams.get("safeSearch"), "strict");
  assert.equal(requestedUrl.searchParams.get("videoEmbeddable"), "true");
  assert.deepEqual((await response.json()).items[0], { videoId: "abc123XYZ", title: "Fractions", channel: "Learning Channel", thumbnail: "https://img.example/thumb.jpg" });
});
