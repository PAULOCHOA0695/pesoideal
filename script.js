// Seleccionar elementos del DOM
const calcularBtn = document.getElementById('calcular');
const resultadoDiv = document.getElementById('resultado');
const imcDiv = document.getElementById('imc');
const kilosExtrasDiv = document.getElementById('kilos-extras');
const leyendaBtn = document.getElementById('leyendaBtn');
const recomendacionesBtn = document.getElementById('recomendacionesBtn');
const modal = document.getElementById('leyendaModal');
const recomendacionesModal = document.getElementById('recomendacionesModal');
const closeBtns = document.querySelectorAll('.close');
const recomendacionesTexto = document.getElementById('recomendacionesTexto');

// Función para calcular el peso ideal
function calcularPesoIdeal(edad, altura) {
  return ((altura - 100 + (edad / 10)) * 0.9).toFixed(2);
}

// Función para calcular el IMC
function calcularIMC(peso, altura) {
  const alturaMetros = altura / 100;
  return (peso / (alturaMetros * alturaMetros)).toFixed(2);
}

// Función para determinar la composición corporal
function composicionCorporal(imc) {
  if (imc < 18.5) {
    return "Peso inferior a lo normal";
  } else if (imc >= 18.5 && imc <= 24.9) {
    return "Peso ideal o Normal";
  } else if (imc >= 25.0 && imc <= 29.9) {
    return "Peso superior a lo normal";
  } else if (imc >= 30.0 && imc <= 34.9) {
    return "Obesidad grado 1";
  } else if (imc >= 35.0 && imc <= 39.9) {
    return "Obesidad grado 2";
  } else {
    return "Obesidad grado 3 (mórbida)";
  }
}

// Función para mostrar recomendaciones según el IMC
function mostrarRecomendaciones(composicion) {
  let recomendaciones = "";

  switch (composicion) {
    case "Peso inferior a lo normal":
      recomendaciones = `
        <p><strong>Recomendaciones:</strong></p>
        <ul>
          <li>Aumenta tu ingesta calórica con alimentos nutritivos.</li>
          <li>Incluye proteínas, carbohidratos y grasas saludables en tu dieta.</li>
          <li>Realiza ejercicio de fuerza para ganar masa muscular.</li>
          <li><strong>Consulta a un nutricionista</strong> para un plan personalizado.</li>
        </ul>
      `;
      break;
    case "Peso ideal o Normal":
      recomendaciones = `
        <p><strong>¡Felicidades!</strong></p>
        <ul>
          <li>Mantén una dieta equilibrada y variada.</li>
          <li>Realiza actividad física regularmente.</li>
          <li>Descansa lo suficiente y mantén hábitos saludables.</li>
          <li>¡Sigue así!</li>
        </ul>
      `;
      break;
    case "Peso superior a lo normal":
      recomendaciones = `
        <p><strong>Recomendaciones:</strong></p>
        <ul>
          <li>Reduce el consumo de alimentos procesados y azúcares.</li>
          <li>Aumenta la ingesta de frutas, verduras y proteínas magras.</li>
          <li>Realiza ejercicio cardiovascular y de fuerza.</li>
          <li><strong>Consulta a un nutricionista</strong> para un plan de pérdida de peso.</li>
        </ul>
      `;
      break;
    case "Obesidad grado 1":
      recomendaciones = `
        <p><strong>Recomendaciones:</strong></p>
        <ul>
          <li>Adopta una dieta baja en calorías y rica en nutrientes.</li>
          <li>Realiza ejercicio regularmente, como caminar o nadar.</li>
          <li>Evita el sedentarismo y mantén un estilo de vida activo.</li>
          <li><strong>Consulta a un nutricionista</strong> para un plan personalizado.</li>
        </ul>
      `;
      break;
    case "Obesidad grado 2":
      recomendaciones = `
        <p><strong>Recomendaciones:</strong></p>
        <ul>
          <li>Sigue una dieta controlada en calorías y supervisada por un profesional.</li>
          <li>Realiza ejercicio moderado y constante.</li>
          <li><strong>Consulta a un nutricionista y un psicólogo</strong> para abordar hábitos y emociones.</li>
        </ul>
      `;
      break;
    case "Obesidad grado 3 (mórbida)":
      recomendaciones = `
        <p><strong>Recomendaciones:</strong></p>
        <ul>
          <li>Busca atención médica inmediata para un plan integral.</li>
          <li>Sigue una dieta estricta supervisada por un profesional.</li>
          <li>Realiza ejercicio bajo supervisión médica.</li>
          <li><strong>Consulta a un nutricionista, psicólogo y endocrinólogo</strong> para un tratamiento multidisciplinario.</li>
        </ul>
      `;
      break;
    default:
      recomendaciones = "<p>No hay recomendaciones disponibles.</p>";
  }

  recomendacionesTexto.innerHTML = recomendaciones;
  recomendacionesModal.style.display = "block";
}

// Escuchar el clic en el botón de calcular
calcularBtn.addEventListener('click', () => {
  const edad = parseInt(document.getElementById('edad').value);
  const altura = parseInt(document.getElementById('altura').value);
  const peso = parseFloat(document.getElementById('peso').value);

  // Validar entradas
  if (isNaN(edad) || isNaN(altura) || isNaN(peso) || edad <= 0 || altura <= 0 || peso <= 0) {
    resultadoDiv.textContent = "Por favor, ingresa valores válidos.";
    resultadoDiv.style.color = "red";
    imcDiv.textContent = "";
    kilosExtrasDiv.textContent = "";
    recomendacionesBtn.style.display = "none";
  } else {
    // Calcular peso ideal, IMC y kilos extras/faltantes
    const pesoIdeal = calcularPesoIdeal(edad, altura);
    const imc = calcularIMC(peso, altura);
    const composicion = composicionCorporal(imc);
    const diferenciaPeso = (peso - pesoIdeal).toFixed(2);

    // Mostrar resultados
    resultadoDiv.textContent = `Tu peso ideal es aproximadamente: ${pesoIdeal} kg`;
    resultadoDiv.style.color = "#333";
    imcDiv.textContent = `Tu IMC es: ${imc} (${composicion})`;

    // Determinar si faltan o sobran kilos
    if (diferenciaPeso > 0) {
      kilosExtrasDiv.textContent = `Tienes ${diferenciaPeso} kg extras.`;
    } else if (diferenciaPeso < 0) {
      kilosExtrasDiv.textContent = `Te faltan ${Math.abs(diferenciaPeso)} kg para alcanzar tu peso ideal.`;
    } else {
      kilosExtrasDiv.textContent = "¡Estás en tu peso ideal!";
    }

    // Mostrar el botón de recomendaciones
    recomendacionesBtn.style.display = "block";

    // Guardar la composición corporal para usarla en las recomendaciones
    recomendacionesBtn.onclick = () => mostrarRecomendaciones(composicion);
  }
});

// Abrir el modal al hacer clic en el botón de leyenda
leyendaBtn.addEventListener('click', () => {
  modal.style.display = "block";
});

// Cerrar los modales al hacer clic en la "X"
closeBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.style.display = "none";
    recomendacionesModal.style.display = "none";
  });
});

// Cerrar los modales al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
  if (event.target === modal || event.target === recomendacionesModal) {
    modal.style.display = "none";
    recomendacionesModal.style.display = "none";
  }
});