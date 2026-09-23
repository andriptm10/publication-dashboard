const SCOPUS_ID = "57222618904";
const SCHOLAR_ID = "825itBQAAAAJ";

const FALLBACK = {
  scopus: {
    id: SCOPUS_ID,
    hIndex: 11,
    live: false,
    profileUrl: `https://www.scopus.com/authid/detail.uri?authorId=${SCOPUS_ID}`,
  },
  scholar: {
    id: SCHOLAR_ID,
    hIndex: 14,
    live: false,
    profileUrl: `https://scholar.google.com/citations?user=${SCHOLAR_ID}&hl=en`,
  },
};

async function getScopusMetric(apiKey) {
  if (!apiKey) return FALLBACK.scopus;
  const response = await fetch(
    `https://api.elsevier.com/content/author/author_id/${SCOPUS_ID}?view=METRICS`,
    {
      headers: {
        Accept: "application/json",
        "X-ELS-APIKey": apiKey,
      },
    },
  );
  if (!response.ok) throw new Error(`Scopus API returned ${response.status}`);
  const data = await response.json();
  const profile = data?.["author-retrieval-response"]?.[0];
  const hIndex = Number(profile?.["h-index"] ?? profile?.coredata?.["h-index"]);
  if (!Number.isFinite(hIndex)) throw new Error("Scopus h-index was missing");
  return { ...FALLBACK.scopus, hIndex, live: true };
}

async function getScholarMetric(apiKey) {
  if (!apiKey) return FALLBACK.scholar;
  const params = new URLSearchParams({
    engine: "google_scholar_author",
    author_id: SCHOLAR_ID,
    hl: "en",
    api_key: apiKey,
  });
  const response = await fetch(`https://serpapi.com/search.json?${params}`);
  if (!response.ok) throw new Error(`Google Scholar provider returned ${response.status}`);
  const data = await response.json();
  const hIndexRow = data?.cited_by?.table?.find(
    (row) => row.h_index || row.indice_h,
  );
  const hIndex = Number(hIndexRow?.h_index?.all ?? hIndexRow?.indice_h?.all);
  if (!Number.isFinite(hIndex)) throw new Error("Google Scholar h-index was missing");
  return { ...FALLBACK.scholar, hIndex, live: true };
}

export default async () => {
  const [scopusResult, scholarResult] = await Promise.allSettled([
    getScopusMetric(Netlify.env.get("ELSEVIER_API_KEY")),
    getScholarMetric(Netlify.env.get("SERPAPI_KEY")),
  ]);

  const scopus = scopusResult.status === "fulfilled" ? scopusResult.value : FALLBACK.scopus;
  const scholar = scholarResult.status === "fulfilled" ? scholarResult.value : FALLBACK.scholar;

  return new Response(
    JSON.stringify({
      scopus,
      scholar,
      updatedAt: new Date().toISOString(),
      live: scopus.live || scholar.live,
    }),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=21600, s-maxage=21600, stale-while-revalidate=86400",
      },
    },
  );
};
