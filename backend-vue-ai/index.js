const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/db_vue', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log('Conected to MongoDB'))
    .catch(err => console.error('Error to connect MongoDB', err));

    const MiColeccionSchema = new mongoose.Schema({
    name: String,
    description: String,
});

const MiColeccion = mongoose.model('mis_skills', MiColeccionSchema);

const schema = buildSchema(`
    type Skill {
      id: ID!
      name: String!
      description: String
    }
  
    type Query {
      getSkills: [Skill]
      getSkill(id: ID!): Skill
    }
  
    type Mutation {
      addSkill(name: String!, description: String): Skill
      deleteSkill(id: ID!): Skill
    }
`);

const resolvers = {
    getSkills: async () => {
      try {
        return await MiColeccion.find();
      } catch (error) {
        throw new Error('Error fetching skills');
      }
    },
    getSkill: async ({ id }) => {
      try {
        return await MiColeccion.findById(id);
      } catch (error) {
        throw new Error('Skill not found');
      }
    },
    addSkill: async ({ name, description }) => {
      try {
        const newSkill = new MiColeccion({ name, description });
        return await newSkill.save();
      } catch (error) {
        throw new Error('Error adding skill');
      }
    },
    deleteSkill: async ({ id }) => {
      try {
        const deletedSkill = await MiColeccion.findByIdAndDelete(id);
        if (!deletedSkill) {
          console.log(`Deleted Skill: ${id}`);
          throw new Error('Skill not found');
        }
        return deletedSkill;
      } catch (error) {
        throw new Error('Error deleting skill');
      }
    }
  };

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true, 
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));