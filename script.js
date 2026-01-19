let paso = 0;

const titulos = [
    "Paso 0: Consigna del ejercicio",
    "Paso 1: Planteamiento del problema",
    "Paso 2: Contextualización",
    "Paso 3: Posiciones posibles",
    "Paso 4: Argumentación personal",
    "Paso 5: Conclusión"
];

const instrucciones = [
    "Escribe la consigna del ejercicio.",
    "Formula la pregunta filosófica que quieres tratar.",
    "Explica el contexto del problema.",
    "Expón al menos dos posiciones distintas sobre este problema.",
    "Desarrolla tu postura personal con argumentos.",
    "Resume tu postura final respondiendo a la pregunta inicial."
];

document.getElementById("btn-siguiente").addEventListener("click", () => {
    if (paso < 5) paso++;
    actualizarPaso();
});

document.getElementById("btn-feedback").addEventListener("click", pedirFeedbackIA);

function actualizarPaso() {
    document.getElementById("titulo-paso").textContent = titulos[paso];
    document.getElementById("instruccion-paso").textContent = instrucciones[paso];
    document.getElementById("texto-alumno").value = "";
    document.getElementById("respuesta-ia").innerHTML = "";
}

async function pedirFeedbackIA() {
    const textoAlumno = document.getElementById("texto-alumno").value;

    if (!textoAlumno.trim()) {
        document.getElementById("respuesta-ia").innerHTML = "Escribe algo antes de pedir feedback.";
        return;
    }

    document.getElementById("respuesta-ia").innerHTML = "Pensando...";

    const prompt = `
Ets un professor de filosofia que actua com a tutor socràtic per a alumnes d'ESO o Batxillerat.
L'alumne està escrivint una dissertació filosòfica pas a pas.

Consigna de l'exercici: ${document.querySelector("#paso-container textarea").value}
Pas actual: ${titulos[paso]}
Text de l'alumne: ${textoAlumno}

La teva tasca és:
- Donar feedback només sobre aquest pas.
- Indicar què està bé i què es pot millorar.
- Fer preguntes que ajudin a pensar millor.
- Sugerir millores concretes, però sense redactar el text per ell.
- No escriguis paràgrafs complets.
- Màxim 8–10 línies.
`;

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBp6ZaopjxSXnslYxv_qsAL07T-0QlrO0U",
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

        document.getElementById("respuesta-ia").innerHTML = textoIA;

    } catch (error) {
        document.getElementById("respuesta-ia").innerHTML = "Error al connectar amb la IA.";
    }
}

actualizarPaso();
