Sistema de Preguntas y Respuestas

Descripción

Este proyecto permite crear, responder y gestionar preguntas de manera sencilla. Se puede usar de dos formas: con funciones globales o con una clase en JavaScript.

Funcionalidades
	•	Crear preguntas con opciones y una respuesta correcta.
	•	Responder preguntas y verificar si la respuesta es correcta o incorrecta.
	•	Ver resultados con el total de respuestas correctas e incorrectas.

Enfoques

1. Funciones Globales
	•	Usa funciones simples para manejar preguntas y respuestas.
	•	Es fácil de entender y rápido de implementar.
	•	Recomendado para proyectos pequeños.

2. Programación Orientada a Objetos (POO)
	•	Usa una clase Quiz para organizar la lógica.
	•	Permite agregar más funcionalidades fácilmente.
	•	Mejor para proyectos más grandes y escalables.

Ejemplo de Uso

quiz.crearPregunta("¿Cuál es el planeta más grande?", ["Júpiter", "Saturno"], "Júpiter");
quiz.responderPregunta(0, "Júpiter"); // Correcto
quiz.mostrarResultados(); // Muestra el total de respuestas correctas e incorrectas
