export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    // Endpoint: GET /api/scores (Get top 10 scores)
    if (url.pathname === "/api/scores" && request.method === "GET") {
      try {
        const { results } = await env.DB.prepare(
          "SELECT name, score FROM leaderboard ORDER BY score DESC, created_at ASC LIMIT 10"
        ).all();
        return new Response(JSON.stringify(results), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Endpoint: POST /api/score (Submit a score)
    if (url.pathname === "/api/score" && request.method === "POST") {
      try {
        const { name, score } = await request.json();
        if (!name || typeof score !== "number" || name.trim().length === 0) {
          return new Response(JSON.stringify({ error: "Invalid data" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        
        // Clean and clip name
        const cleanName = name.trim().substring(0, 15);

        // Insert score into the D1 database
        await env.DB.prepare(
          "INSERT INTO leaderboard (name, score) VALUES (?, ?)"
        ).bind(cleanName, score).run();

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  }
};
