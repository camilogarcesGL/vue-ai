<template>
  <div>
      <div v-for="(message, index) in chatMessages" :key="index">
          <p><strong>{{ message.role }}:</strong> {{ message.content }}</p>
      </div>
      <input v-model="userMessage" @keyup.enter="sendMessage" placeholder="Escribe un mensaje..." />
      <button @click="sendMessage">Enviar</button>
      <br />
      <button @click="sendMess">aquiiiii</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
      return {
          userMessage: '',
          chatMessages: []
      };
  },
  methods: {
      async sendMessage() {
          if (this.userMessage.trim() === '') return;

          const message = { role: 'user', content: this.userMessage };
          this.chatMessages.push(message);

          try {
              const response = await axios.post('http://localhost:3000/chat', { message: this.userMessage });
              this.chatMessages.push({ role: 'assistant', content: response.data.choices[0].message.content });
          } catch (error) {
              console.error('Error:', error);
          }

          this.userMessage = '';
      }
  }
}
</script>
