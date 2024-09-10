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
      },
      async sendMess() {
        await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json'
            }
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
      }
  }
}
</script>
