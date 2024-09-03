<template>
    <div>
    <input v-model="newName" type="text" placeholder="Add new skill">
    <button type="button" @click="addNewName">Add new skill</button>
  </div>
    <div>
      <ul>
        <li v-for="name in names" :key="name">{{ name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import { GraphQLClient, gql } from 'graphql-request';
  
  export default {
    data() {
      return {
        names: [],
        newName: ''
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
    }
    }
  };
  </script>