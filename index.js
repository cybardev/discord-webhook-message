export default {
  async fetch(request, env, _ctx) {
    // Only GET requests work with this proxy.
    if (request.method !== "GET") {
      return new Response(`Method ${request.method} not allowed.`, {
        status: 405,
        headers: { Allow: "GET" },
      });
    }

    const args = new URL(request.url).searchParams;
    const content = args.get("content") || "This is a sample webhook response.";

    try {
      return await fetch(`https://discord.com/api/webhooks/${env.WEBHOOK_ID}/${env.WEBHOOK_TOKEN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  },
};
