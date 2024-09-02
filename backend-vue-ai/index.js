const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, graphql } = require('graphql');


const names = ['React', 'Javascript', 'TypeScript', 'NodeJs', 'Express', 'MongoDB', 'PostgreSQL'];
// schema
const schema = buildSchema(`
    type Query {
        hello: String,
        names: [String]
    }
`);

// resolvers
const root = {
    hello: () => {
        return 'hola camilo'
    },
    names: () => {
        return names;
    }
}

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],   
}));

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
})
);

app.listen(4000, () => console.log('Servidor en uso http://localhost:4000/graphql'));