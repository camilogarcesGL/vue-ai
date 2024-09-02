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
      this.obtenerNombres();
    },
    methods: {
      async obtenerNombres() {
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
          console.log('Los nombres son:', this.names);
        } catch (error) {
          console.error('Error los names:', error);
        }
      }
    }
  };
  </script>