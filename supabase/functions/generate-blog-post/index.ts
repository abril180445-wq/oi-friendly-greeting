import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating blog post about:", topic);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: `Você é um especialista em criar artigos para blogs de tecnologia e desenvolvimento web.

Quando receber um tema, crie um artigo completo e profissional seguindo este formato JSON:

{
  "title": "Título atrativo e otimizado para SEO",
  "slug": "url-amigavel-do-artigo",
  "excerpt": "Resumo de 1-2 frases que apareça na listagem (máximo 160 caracteres)",
  "category": "Uma categoria relevante (ex: Desenvolvimento Web, Inteligência Artificial, Design, etc)",
  "tags": ["tag1", "tag2", "tag3"],
  "content": "Conteúdo completo do artigo em HTML com parágrafos, headers h2/h3, listas, etc"
}

Regras:
- O conteúdo deve ter pelo menos 800 palavras
- Use HTML semântico: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>
- Inclua uma introdução, desenvolvimento com subtópicos e conclusão
- Escreva em português brasileiro
- Seja informativo, atual e engajante
- Retorne APENAS o JSON, sem texto adicional`
          },
          { 
            role: "user", 
            content: `Crie um artigo completo sobre: ${topic}` 
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Muitas requisições. Tente novamente em alguns segundos." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos esgotados." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "Erro ao gerar artigo." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log("Generated content:", content?.substring(0, 200));

    // Parse the JSON from the response
    let blogPost;
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      blogPost = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return new Response(JSON.stringify({ error: "Erro ao processar resposta da IA." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(blogPost), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Generate blog post error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
