//Permitir a los usuarios crear encuestas con opciones de respuesta.
//Permitir a los usuarios votar en las encuestas.
//Mostrar los resultados de las encuestas en tiempo real.
//Almacenar los datos de las encuestas y los votos en una variable.
//Implementar la solución utilizando programación orientada a objetos (POO) y programación funcional (PF).

class Encuesta {
  constructor(nombre, preguntas) {
    this.nombre = nombre;
    this.preguntas = preguntas;
  }

  votarEnPregunta(indicePregunta, indiceOpcion) {
    const pregunta = this.preguntas[indicePregunta];
    if (
      pregunta &&
      indiceOpcion >= 0 &&
      indiceOpcion < pregunta.opciones.length
    ) {
      pregunta.votos[indiceOpcion]++;
    } else {
      alert("Opcion no valida.");
    }
  }

  obtenerResultados() {
    return this.preguntas
      .map((pregunta, index) => {
        const resultados = pregunta.opciones
          .map((opcion, i) => `${opcion}: ${pregunta.votos[i]} votos`)
          .join("\n");
        return `Pregunta ${index + 1}: ${pregunta.texto}\n${resultados}`;
      })
      .join("\n\n");
  }
}

class GestorEncuestas {
  constructor() {
    this.encuestas = [];
  }

  crearEncuesta(nombre, preguntas) {
    if (preguntas.length < 8) {
      alert("Una encuesta debe tener al menos 8 preguntas.");
      return;
    }
    const encuesta = new Encuesta(nombre, preguntas);
    this.encuestas.push(encuesta);
  }

  obtenerEncuesta(indice) {
    if (indice >= 0 && indice < this.encuestas.length) {
      return this.encuestas[indice];
    } else {
      alert("Encuesta no encontrada.");
      return null;
    }
  }

  obtenerTodasLasEncuestas() {
    return this.encuestas;
  }
}

function crearEncuesta(gestor) {
  const nombre = prompt("Ingresa el nombre de la encuesta:");
  const preguntas = [];
  while (preguntas.length < 8) {
    const textoPregunta = prompt(
      `Ingresa el texto de la pregunta ${preguntas.length + 1}:`
    );
    const opciones = [];
    while (true) {
      const opcion = prompt(
        `Ingresa una opcion para la pregunta ${
          preguntas.length + 1
        } (o deja en blanco para terminar):`
      );
      if (opcion) {
        opciones.push(opcion);
      } else if (opciones.length > 0) {
        break;
      } else {
        alert("Debes ingresar al menos una opcion.");
      }
    }
    preguntas.push({
      texto: textoPregunta,
      opciones,
      votos: new Array(opciones.length).fill(0),
    });
  }
  gestor.crearEncuesta(nombre, preguntas);
  alert("Encuesta creada exitosamente.");
}

function votarEncuesta(gestor) {
  const encuestas = gestor.obtenerTodasLasEncuestas();
  if (encuestas.length === 0) {
    alert("No hay encuestas disponibles para votar.");
    return;
  }

  let encuestasTexto = encuestas
    .map((encuesta, index) => `${index + 1}. ${encuesta.nombre}`)
    .join("\n");
  const indiceEncuesta =
    parseInt(
      prompt(
        `Selecciona el numero de la encuesta en la que quieres votar:\n\n${encuestasTexto}`
      )
    ) - 1;
  const encuesta = gestor.obtenerEncuesta(indiceEncuesta);
  if (encuesta) {
    encuesta.preguntas.forEach((pregunta, indicePregunta) => {
      const opcionesTexto = pregunta.opciones
        .map((opcion, index) => `${index + 1}. ${opcion}`)
        .join("\n");
      const indiceOpcion =
        parseInt(
          prompt(
            `Pregunta ${indicePregunta + 1}: ${
              pregunta.texto
            }\n\n${opcionesTexto}\n\nIngresa el numero de la opcion en la que quieres votar:`
          )
        ) - 1;
      encuesta.votarEnPregunta(indicePregunta, indiceOpcion);
    });
    alert("Votos registrados exitosamente.");
  }
}

function mostrarResultados(gestor) {
  const encuestas = gestor.obtenerTodasLasEncuestas();
  if (encuestas.length === 0) {
    alert("No hay encuestas disponibles para mostrar resultados.");
    return;
  }

  let encuestasTexto = encuestas
    .map((encuesta, index) => `${index + 1}. ${encuesta.nombre}`)
    .join("\n");
  const indiceEncuesta =
    parseInt(
      prompt(
        `Selecciona el numero de la encuesta de la que quieres ver los resultados:\n\n${encuestasTexto}`
      )
    ) - 1;
  const encuesta = gestor.obtenerEncuesta(indiceEncuesta);
  if (encuesta) {
    alert(`Resultados de la encuesta:\n\n${encuesta.obtenerResultados()}`);
  }
}

function principal() {
  const gestor = new GestorEncuestas();
  let ejecutando = true;
  while (ejecutando) {
    const accion = prompt(
      "Que quieres hacer?\n1. Crear encuesta\n2. Votar en una encuesta\n3. Ver resultados de una encuesta\n4. Salir"
    );
    switch (accion) {
      case "1":
        crearEncuesta(gestor);
        break;
      case "2":
        votarEncuesta(gestor);
        break;
      case "3":
        mostrarResultados(gestor);
        break;
      case "4":
        ejecutando = false;
        break;
      default:
        alert("Accion no valida.");
    }
  }
}

principal();
