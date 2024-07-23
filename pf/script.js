const encuestas = [];
let encuestaTemporal = {};

const letras = ["a", "b", "c", "d", "e", "f", "g", "h"];
let encuestaActual = 0;

function principal() {
  let input = prompt(
    `Introduzca el numero de la opcion:
    1 crear una encuentra
    2 votar en una encuesta
    3 ver resultados encuesta`
  );

  if (input === "1") {
    crearEncuesta();
  } else if (input === "2") {
    votar();
  } else if (input === "3") {
    const numeroEncuesta = listaDeEncuentas();
    mostrarResultados(numeroEncuesta);
  }
}

function crearEncuesta() {
  let titulo = prompt(`Ingrese el titulo de la encuesta`);
  encuestaTemporal = {};
  encuestaTemporal.nombre = titulo;
  crearPreguntas();
  principal();
}
function crearPreguntas() {
  let seguirA = true;
  encuestaTemporal.preguntas = [];
  while (seguirA) {
    let pregunta = prompt(
      `Ingrese la pregunta o si la anterior fue su ultima pregunta escriba salir`
    );
    if (pregunta === "salir") {
      break;
    }
    const objetoPregunta = { pregunta: pregunta, alternativas: [] };
    let letraActual = 0;
    let seguirB = true;
    while (seguirB) {
      let alternativa = prompt(`Ingrese la alternativa ${letras[letraActual]}
        (para terminar escribe salir)`);
      letraActual++;
      if (alternativa === "salir") {
        break;
      }
      objetoPregunta.alternativas.push({ texto: alternativa, votos: 0 });
    }

    encuestaTemporal.preguntas.push(objetoPregunta);
  }
  encuestas.push(encuestaTemporal);
}

function votar() {
  const numeroEncuesta = listaDeEncuentas();
  encuestar(numeroEncuesta);
  mostrarResultados(numeroEncuesta);
}

function mostrarResultados(indiceDeLaEncuesta) {
  let texto = "";
  for (let o = 0; o < encuestas[indiceDeLaEncuesta].preguntas.length; o++) {
    const pregunta = encuestas[indiceDeLaEncuesta].preguntas[o];
    const sonIguales = revisarIgualdad(pregunta);
    let votos;
    let objetoGanador;
    if (sonIguales) {
      votos = pregunta.alternativas[0].votos;
      texto += `En la pregunta: 
      ${pregunta.pregunta}
      hay un empate
      con ${votos} votos\n`;
    } else {
      objetoGanador = buscaMayor(pregunta.alternativas);
      texto += `En la pregunta: 
      ${pregunta.pregunta}
      la alternativa mas votada es: 
      ${objetoGanador.texto}
      por ${objetoGanador.votos} votos \n`;
    }
    texto += "======================\n";
  }
  prompt(texto);
  principal();
}

function revisarIgualdad(pregunta) {
  console.log(pregunta);
  return pregunta.alternativas.every(
    (alternativaActual) =>
      alternativaActual.votos === pregunta.alternativas[0].votos
  );
}

function buscaMayor(alternativas) {
  let votoMasAlto = 0;
  let alternativaGanadora = {};
  for (let k = 0; k < alternativas.length; k++) {
    if (alternativas[k].votos > votoMasAlto) {
      votoMasAlto = alternativas[k].votos;
      alternativaGanadora = alternativas[k];
    }
  }
  return alternativaGanadora;
}

function listaDeEncuentas() {
  const nombresDeEncuestas = encuestas.map(
    (actual, indice) => indice + 1 + ".- " + actual.nombre
  );
  const texto = nombresDeEncuestas.join("\n");
  const stringEncuesta = prompt(
    `escribe el numero de encuesta:
${texto}`
  );
  return parseInt(stringEncuesta) - 1;
}

function encuestar(numeroEncuesta) {
  const encuesta = encuestas[numeroEncuesta];

  for (let i = 0; i < encuesta.preguntas.length; i++) {
    let texto = "Ingrese el numero de la alternativa para votar" + "\n";
    texto += encuesta.preguntas[i].pregunta + "\n";
    for (let w = 0; w < encuesta.preguntas[i].alternativas.length; w++) {
      texto +=
        `${w + 1}.- ` + encuesta.preguntas[i].alternativas[w].texto + "\n";
    }
    const alternativaSeleccionada = prompt(texto);
    encuesta.preguntas[i].alternativas[alternativaSeleccionada - 1].votos++;
  }
}

principal();
