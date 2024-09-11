<template>
    <div class="classbutton">
      <input v-model="newName" type="text" placeholder=" New skill">
      <button  class="classbuttonadded" type="button" @click="addNewName">
        <span>Add</span>
      </button>
    </div>
  
    <div v-if="showModal" class="modal"> 
      <div class="modal-content">
        <p>Please enter a skill before add.</p>
        <button class="classbuttonclosed" type="button" @click="showModal = false">Close</button>
      </div>
    </div>

    <div class="contentbuttonskill">
      <ul>
        <li class="classbuttonskill flex items-center justify-between" v-for="name in names" :key="name">
          {{ name }}
          <button class="" type="button" @click="deleteNewName(name)">
            <svg class="w-[15px] h-[15px] text-gray-800 dark:text-blue" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { GraphQLClient, gql } from 'graphql-request';
  export default {
    data() {
      return {
        names: [],
        newName: '',
        showModal: false, 
      };
    },
    mounted() {
      this.getNames();
    },
    methods: {
      async getNames() {
        const endpoint = 'http://localhost:4000/graphql';
  
        const graphQLClient = new GraphQLClient(endpoint);
  
        const query = gql`
          query {
            names
          }
        `;
  
        try {
          const data = await graphQLClient.request(query);
          this.names = data.names;
        } catch (error) {
          console.error('Error in skills:', error);
        }
      },

      async addNewName() {
        if (this.newName.trim() === '') {
          this.showModal = true; 
          return;
        }
        const endpoint = 'http://localhost:4000/graphql';
        const graphQLClient = new GraphQLClient(endpoint);

        const mutation = gql`
          mutation AddNewName($newName: String!) {
            addNewName(newName: $newName) 
          }
        `;

        try {
          const data = await graphQLClient.request(mutation, { newName: this.newName });
          this.names = data.addNewName;
          this.newName = '';
        } catch (error) {
          console.error('Error to add new skill', error);
        }
      },


      async deleteNewName(nameToDelete) {
        const endpoint = 'http://localhost:4000/graphql';

        const graphQLClient = new GraphQLClient(endpoint);

        const mutation = gql`
          mutation DeleteName($nameToDelete: String!) {
            deleteNewName(nameToDelete: $nameToDelete) 
          }
        `;

        try {
          const data = await graphQLClient.request(mutation, { nameToDelete });
          this.names = data.deleteNewName; 
        } catch (error) {
          console.error('Error deleting skill', error);
        }
      }
    }
  };
  </script>

<style>

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  align-items: center;
  justify-content: center; 
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  justify-content: center;
  display: flex;
}
</style> 