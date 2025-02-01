class Quiz {
    
    #countTrue = 0;
    #countFalse = 0;

    constructor() {
        this.preguntas = [];
        this.respuestasUsuario = [];
    }

    crearPregunta(pregunta, respuestas, respuestaCorrecta) {
        try {
            if (!pregunta || !respuestas || !respuestaCorrecta) {
                throw new Error("Todos los campos son necesarios");
            }
            if (typeof pregunta !== "string" || !Array.isArray(respuestas) || typeof respuestaCorrecta !== "string") {
                throw new Error("Los campos deben tener el formato correcto");
            }
            const preguntaData = { pregunta, respuestas, respuestaCorrecta };
            this.preguntas.push(preguntaData);
            this.renderizarPreguntas();
        } catch (error) {
            console.log(error.message);
        }
    }

    responderPregunta(numeroPregunta, respuestaUsuario) {
        try {
            if (numeroPregunta < 0 || numeroPregunta >= this.preguntas.length) {
                throw new Error("Número de pregunta inválido");
            }

            const preguntaActual = this.preguntas[numeroPregunta];
            const esCorrecta = preguntaActual.respuestaCorrecta === respuestaUsuario;
            
            if (esCorrecta) {
                this.#countTrue++;
            } else {
                this.#countFalse++;
            }

            this.respuestasUsuario.push(respuestaUsuario);
            this.mostrarFeedback(numeroPregunta, esCorrecta);
            this.actualizarResultados();

        } catch (error) {
            console.log(error.message);
        }
    }

    mostrarFeedback(numeroPregunta, esCorrecta) {
        const feedbackElement = document.getElementById(`feedback-${numeroPregunta}`);
        if (feedbackElement) {
            feedbackElement.textContent = esCorrecta ? 
                "¡Correcto!" : 
                `Incorrecto. La respuesta correcta era: ${this.preguntas[numeroPregunta].respuestaCorrecta}`;
            feedbackElement.className = `feedback ${esCorrecta ? 'correct' : 'incorrect'}`;
        }
    }

    actualizarResultados() {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <h3>Resultados:</h3>
            <p>Respuestas correctas: ${this.#countTrue}</p>
            <p>Respuestas incorrectas: ${this.#countFalse}</p>
            <p>Total de preguntas: ${this.preguntas.length}</p>
            <h4>Tus respuestas:</h4>
            <p>${this.respuestasUsuario.join(', ')}</p>
        `;
    }

    renderizarPreguntas() {
        const container = document.getElementById('questionList');
        container.innerHTML = this.preguntas.map((pregunta, index) => `
            <div class="question">
                <h3>${index + 1}. ${pregunta.pregunta}</h3>
                ${pregunta.respuestas.map(respuesta => `
                    <div class="option" onclick="quiz.responderPregunta(${index}, '${respuesta}')">
                        ${respuesta}
                    </div>
                `).join('')}
                <div id="feedback-${index}" class="feedback"></div>
            </div>
        `).join('');
    }
}


const quiz = new Quiz();


quiz.crearPregunta(
    "¿Cuál es el planeta más grande del sistema solar?",
    ["Júpiter", "Saturno", "Neptuno", "Urano"],
    "Júpiter"
);
quiz.crearPregunta(
    "¿En qué año llegó el hombre a la Luna?",
    ["1969", "1975", "1963", "1970"],
    "1969"
);
quiz.crearPregunta(
    "¿Cuál es el lenguaje de programación más utilizado en el mundo?",
    ["Python", "JavaScript", "C++", "Java"],
    "JavaScript"
);
quiz.crearPregunta(
    "¿Cuántos colores hay en el arcoíris?",
    ["7", "5", "6", "8"],
    "7"
);
quiz.crearPregunta(
    "¿Quién pintó la Mona Lisa?",
    ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"],
    "Leonardo da Vinci"
);
quiz.crearPregunta(
    "¿Cuál es el animal terrestre más rápido?",
    ["Guepardo", "León", "Antílope", "Caballo"],
    "Guepardo"
);
quiz.crearPregunta(
    "¿Qué país tiene la mayor población del mundo?",
    ["India", "Estados Unidos", "China", "Rusia"],
    "China"
);
quiz.crearPregunta(
    "¿En qué continente está Egipto?",
    ["África", "Asia", "Europa", "América"],
    "África"
);
