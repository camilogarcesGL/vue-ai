const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, graphql } = require('graphql');


const names = ['React', 'Javascript', 'TypeScript', 'NodeJs', 'Express', 'MongoDB', 'PostgreSQL'];

const schema = buildSchema(`
    type Query {
        message: String,
        names: [String]
    }
`);

const root = {
    message: () => {
        return 'Welcome Sales Force'
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

app.listen(4000, () => console.log('Server lauched  http://localhost:4000/graphql'));