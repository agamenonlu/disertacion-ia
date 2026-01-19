document.addEventListener("DOMContentLoaded", () => {
  const pasos = document.querySelectorAll(".paso");
  const botones = document.querySelectorAll(".btn-siguiente");

  botones.forEach((boton, index) => {
    boton.addEventListener("click", async () => {
      const textarea = pasos[index].querySelector("textarea");
      const texto = textarea.value.trim();

      if (!texto) {
        alert("Escribe algo antes de pedir la guía.");
        return;
      }

      // Mostrar mensaje de carga
      const respuestaDiv = pasos[index].querySelector(".respuesta");
      respuestaDiv.textContent = "Pensant...";

      try {
        const response = await fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            texto: texto,
            paso: index + 1
          })
        });

        const data = await response.json();
        respuestaDiv.textContent = data.respuesta;

      } catch (error) {
        respuestaDiv.textContent = "Error al connectar amb la IA.";
      }
    });
  });
});

