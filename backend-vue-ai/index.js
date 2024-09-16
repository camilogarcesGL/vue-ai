const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, graphql } = require('graphql');


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
  
  app.get('/api/mis_skills', async (req, res) => {
    try {
      const items = await MiColeccion.find();
      res.json(items);
    } catch (error) {
      console.error('Error', error);
      res.status(500).send('Error');
    }
  });
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server on ${PORT}`));