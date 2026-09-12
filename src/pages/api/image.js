export default async function handler(req, res) {
  const { exerciseId, resolution } = req.query;

  if (!exerciseId) {
    res.status(400).json({ error: "exerciseId is required" });
    return;
  }

  const rapidApiHost = "exercisedb.p.rapidapi.com";
  const rapidApiKey = process.env.RAPIDAPI_KEY;

  if (!rapidApiKey) {
    res.status(500).json({ error: "RAPIDAPI_KEY not configured on server" });
    return;
  }

  const url = `https://${rapidApiHost}/image?exerciseId=${encodeURIComponent(
    exerciseId
  )}${resolution ? `&resolution=${encodeURIComponent(resolution)}` : ""}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": rapidApiHost,
        "X-RapidAPI-Key": rapidApiKey,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      res.status(response.status).send(text);
      return;
    }

    const contentType = response.headers.get("content-type") || "image/png";
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=3600");
    res.status(200).send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message || "upstream fetch failed" });
  }
}
