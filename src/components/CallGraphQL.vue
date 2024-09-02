<template>
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
        names: []
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
          console.error('Error in names:', error);
        }
      }
    }
  };
  </script>