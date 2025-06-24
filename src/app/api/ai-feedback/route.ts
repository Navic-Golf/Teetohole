export async function POST(req: Request) {
  const { improvement, strengths, weaknesses } = await req.json();

  const knowledgeBase = `
En perfekt putt ska rulla ungefär 20 cm förbi hålet
Sikta alltid på mitten av koppen från avstånd under 1 meter
Ett vanligt misstag är att slå för hårt i nedförsputtar
En bra övning är att lägga en klubba bakom hålet och försöka undvika att träffa den
Lag putting ska stanna inom 60 cm från hålet
En vanlig amatör lämnar i snitt 1,2 meter kvar vid första putten
`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3-70b-8192',
      messages: [
        {
          role: 'system',
          content: `
Du är en professionell golftränare.
Svara tydligt och konkret utan specialtecken.
Använd fakta från nedanstående kunskapsbas när det är relevant.
Ge alltid konkreta övningar som hjälper spelaren förbättra det den nämnt.

Kunskapsbas:
${knowledgeBase}
          `.trim(),
        },
        {
          role: 'user',
          content: `Jag vill förbättra: ${improvement}\nStyrkor: ${strengths}\nSvagheter: ${weaknesses}`,
        },
      ],
    }),
  });

  const data = await response.json();

  if (!data.choices || data.choices.length === 0) {
    return new Response(JSON.stringify({ error: 'No response from model', raw: data }), { status: 500 });
  }

  return new Response(JSON.stringify({ feedback: data.choices[0].message.content }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
