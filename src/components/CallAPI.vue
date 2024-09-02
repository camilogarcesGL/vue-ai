<template>
    <div>
      <textarea v-model="userInput" placeholder="Escribe tu mensaje"></textarea>
      <button @click="sendMessage">Send</button>
      <p v-if="response">{{ response }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const randomString = "";
  const userInput = ref('');
  const response = ref('');


  
  const sendMessage = async () => {
    try {
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // 'gpt-4'
          messages: [
            { role: 'system', content: 'Eres un asistente útil.' },
            { role: 'user', content: userInput.value },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${randomString}`,
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
  