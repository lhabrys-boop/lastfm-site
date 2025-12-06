const BASE = "https://ws.audioscrobbler.com/2.0/";

exports.handler = async (event) => {
  const apiKey = process.env.f0a237d8a78770fe4629cd68cccae1aa;
  const user = process.env.labrys4;
  const type = event.queryStringParameters.type || "recent";

  const params = new URLSearchParams({
    method: "user.getRecentTracks",
    format: "json",
    api_key: apiKey,
    user,
    limit: "10"
  });

  const res = await fetch(`${BASE}?${params}`);
  const data = await res.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};