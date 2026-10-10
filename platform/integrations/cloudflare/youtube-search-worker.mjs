const SEARCH_PATH = "/api/youtube/v1/search";

function json(status, body, origin = "") {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=300", "x-content-type-options": "nosniff", ...(origin ? { "access-control-allow-origin": origin, vary: "Origin" } : {}) } });
}

export function createYouTubeSearchWorker({ fetchImpl = globalThis.fetch } = {}) {
  return Object.freeze({ async fetch(request, env) {
    const url = new URL(request.url), origin = request.headers.get("origin") || "";
    if (url.pathname !== SEARCH_PATH || request.method !== "GET") return json(404, { error: "not-found" }, origin);
    if (!env?.YOUTUBE_API_KEY || !env?.PLATFORM_ORIGIN) return json(503, { error: "setup-required" }, origin);
    if (origin && origin !== env.PLATFORM_ORIGIN) return json(403, { error: "origin-not-allowed" });
    const query = String(url.searchParams.get("q") || "").trim().slice(0, 120);
    if (query.length < 2) return json(400, { error: "search-words-required" }, origin);
    const googleUrl = new URL("https://www.googleapis.com/youtube/v3/search");
    googleUrl.search = new URLSearchParams({ part: "snippet", type: "video", safeSearch: "strict", videoEmbeddable: "true", maxResults: "12", q: query, key: env.YOUTUBE_API_KEY }).toString();
    try {
      const response = await fetchImpl(googleUrl, { headers: { accept: "application/json" } });
      if (!response.ok) return json(502, { error: "youtube-search-unavailable" }, origin);
      const body = await response.json();
      const items = (body.items || []).map((item) => ({ videoId: item.id?.videoId, title: item.snippet?.title, channel: item.snippet?.channelTitle, thumbnail: item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url })).filter((item) => /^[A-Za-z0-9_-]{6,15}$/.test(item.videoId || "") && item.thumbnail);
      return json(200, { items }, origin);
    } catch { return json(502, { error: "youtube-search-unavailable" }, origin); }
  } });
}

export default createYouTubeSearchWorker();
