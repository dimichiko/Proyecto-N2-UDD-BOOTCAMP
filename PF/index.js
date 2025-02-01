const initialState = {
    preguntas: [],
    respuestasUsuario: [],
    countTrue: 0,
    countFalse: 0
};

const crearPregunta = (state, pregunta, respuestas, respuestaCorrecta) => {
    try {
        if (!pregunta || !respuestas || !respuestaCorrecta) {
            throw new Error("Todos los campos son necesarios");
        }
        if (typeof pregunta !== "string" || !Array.isArray(respuestas) || typeof respuestaCorrecta !== "string") {
            throw new Error("Los campos deben tener el formato correcto");
        }
        
        return {
            ...state,
            preguntas: [...state.preguntas, { pregunta, respuestas, respuestaCorrecta }]
        };
    } catch (error) {
        console.log(error.message);
        return state;
    }
};

const responderPregunta = (state, numeroPregunta, respuestaUsuario) => {
    try {
        if (numeroPregunta < 0 || numeroPregunta >= state.preguntas.length) {
            throw new Error("Número de pregunta inválido");
        }

        const preguntaActual = state.preguntas[numeroPregunta];
        const esCorrecta = preguntaActual.respuestaCorrecta === respuestaUsuario;

        return {
            ...state,
            respuestasUsuario: [...state.respuestasUsuario, respuestaUsuario],
            countTrue: state.countTrue + (esCorrecta ? 1 : 0),
            countFalse: state.countFalse + (esCorrecta ? 0 : 1)
        };
    } catch (error) {
        console.log(error.message);
        return state;
    }
};

const renderizarPreguntas = (state) => {
    const container = document.getElementById('questionList');
    container.innerHTML = state.preguntas.map((pregunta, index) => `
        <div class="question">
            <h3>${index + 1}. ${pregunta.pregunta}</h3>
            ${pregunta.respuestas.map(respuesta => `
                <div class="option" onclick="handleResponder(${index}, '${respuesta}')">
                    ${respuesta}
                </div>
            `).join('')}
            <div id="feedback-${index}" class="feedback"></div>
        </div>
    `).join('');
};

const mostrarFeedback = (state, numeroPregunta, respuestaUsuario) => {
    const preguntaActual = state.preguntas[numeroPregunta];
    const esCorrecta = preguntaActual.respuestaCorrecta === respuestaUsuario;
    
    const feedbackElement = document.getElementById(`feedback-${numeroPregunta}`);
    if (feedbackElement) {
        feedbackElement.textContent = esCorrecta ? 
            "¡Correcto!" : 
            `Incorrecto. La respuesta correcta era: ${preguntaActual.respuestaCorrecta}`;
        feedbackElement.className = `feedback ${esCorrecta ? 'correct' : 'incorrect'}`;
    }
};

const actualizarResultados = (state) => {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Resultados:</h3>
        <p>Respuestas correctas: ${state.countTrue}</p>
        <p>Respuestas incorrectas: ${state.countFalse}</p>
        <p>Total de preguntas: ${state.preguntas.length}</p>
        <h4>Tus respuestas:</h4>
        <p>${state.respuestasUsuario.join(', ')}</p>
    `;
};

let state = initialState;

const handleResponder = (numeroPregunta, respuestaUsuario) => {
    state = responderPregunta(state, numeroPregunta, respuestaUsuario);
    mostrarFeedback(state, numeroPregunta, respuestaUsuario);
    actualizarResultados(state);
};

const preguntas = [
    {
        pregunta: "¿Cuál es el planeta más grande del sistema solar?",
        respuestas: ["Júpiter", "Saturno", "Neptuno", "Urano"],
        respuestaCorrecta: "Júpiter"
    },
    {
        pregunta: "¿En qué año llegó el hombre a la Luna?",
        respuestas: ["1969", "1975", "1963", "1970"],
        respuestaCorrecta: "1969"
    },
    {
        pregunta: "¿Cuál es el lenguaje de programación más utilizado en el mundo?",
        respuestas: ["Python", "JavaScript", "C++", "Java"],
        respuestaCorrecta: "JavaScript"
    },
    {
        pregunta: "¿Cuántos colores hay en el arcoíris?",
        respuestas: ["7", "5", "6", "8"],
        respuestaCorrecta: "7"
    },
    {
        pregunta: "¿Quién pintó la Mona Lisa?",
        respuestas: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"],
        respuestaCorrecta: "Leonardo da Vinci"
    },
    {
        pregunta: "¿Cuál es el animal terrestre más rápido?",
        respuestas: ["Guepardo", "León", "Antílope", "Caballo"],
        respuestaCorrecta: "Guepardo"
    },
    {
        pregunta: "¿Qué país tiene la mayor población del mundo?",
        respuestas: ["India", "Estados Unidos", "China", "Rusia"],
        respuestaCorrecta: "China"
    },
    {
        pregunta: "¿En qué continente está Egipto?",
        respuestas: ["África", "Asia", "Europa", "América"],
        respuestaCorrecta: "África"
    }
];

preguntas.forEach(({ pregunta, respuestas, respuestaCorrecta }) => {
    state = crearPregunta(state, pregunta, respuestas, respuestaCorrecta);
});

renderizarPreguntas(state);
