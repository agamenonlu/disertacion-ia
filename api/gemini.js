export default async function handler(req, res) {
  try {
    const { texto, paso } = req.body;

    const prompt = `
Ets un professor de filosofia que actua com a tutor socràtic per a alumnes d'ESO o Batxillerat.
L'alumne està escrivint una dissertació filosòfica pas a pas.

Pas actual: ${paso}
Text de l'alumne: ${texto}

La teva tasca és:
- Donar feedback només sobre aquest pas.
- Indicar què està bé i què es pot millorar.
- Fer preguntes que ajudin a pensar millor.
- Sugerir millores concretes, però sense redactar el text per ell.
- No escriguis paràgrafs complets.
- Màxim 8–10 línies.
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    const textoIA = data.candidates?.[0]?.content?.parts?.[0]?.text || "No he pogut generar resposta.";

    res.status(200).json({ respuesta: textoIA });

  } catch (error) {
    res.status(500).json({ respuesta: "Error al connectar amb la IA." });
  }
}
