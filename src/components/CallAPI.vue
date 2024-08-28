<template>
    <div>
      <textarea v-model="userInput" placeholder="Escribe tu mensaje"></textarea>
      <button @click="sendMessage">Enviar</button>
      <p v-if="response">{{ response }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const apiKey = "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";
  
  const userInput = ref('');
  const response = ref('');


  
  const sendMessage = async () => {
    try {
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // Cambia a 'gpt-4' si prefieres usar ese modelo
          messages: [
            { role: 'system', content: 'Eres un asistente útil.' },
            { role: 'user', content: userInput.value },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
  
    //
      response.value = result.data.choices[0].message.content;
    } catch (error) {
      console.error('Error al llamar a la API:', error);
      response.value = 'Hubo un error al procesar tu solicitud.';
    }
  };
  </script>
  
  <style scoped>
  textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
  }
  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  