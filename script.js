document.addEventListener("DOMContentLoaded", () => {
const btnFeedback = document.getElementById("btn-feedback");
  const textoAlumno = document.getElementById("texto-alumno");
  const respuestaDiv = document.getElementById("respuesta-ia");

  if (btnFeedback) {
    btnFeedback.addEventListener("click", async () => {
      const texto = textoAlumno.value.trim();

      if (!texto) {
        alert("Escriviu alguna cosa abans de demanar la guia.");
        return;
      }

      // Mostrar mensaje de carga
      respuestaDiv.textContent = "Pensant...";

      try {
        // Intentar obtener el número de paso del título
        let paso = 0;
        const tituloPaso = document.getElementById("titulo-paso");
        if (tituloPaso) {
          const match = tituloPaso.textContent.match(/Paso (\d+)/);
          if (match) {
            paso = parseInt(match[1]);
          }
        }

        const response = await fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            texto: texto,
            paso: paso
          })
        });

        if (!response.ok) {
           throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        respuestaDiv.textContent = data.respuesta;

      } catch (error) {
        console.error("Error:", error);
        respuestaDiv.textContent = "Error al connectar amb la IA.";
      }
    });
  }
});

