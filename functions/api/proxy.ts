export async function onRequestGet(context) {
  const { searchParams } = new URL(context.request.url);
  const target = searchParams.get("url");

  if (!target || !target.startsWith("http")) {
    return new Response("Invalid or missing URL", { status: 400 });
  }

  try {
    const response = await fetch(target);
    const text = await response.text();
    return new Response(text, {
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return new Response("Failed to fetch: " + err.toString(), { status: 500 });
  }
}
