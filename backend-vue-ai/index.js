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

  app.post('/api/mis_skills', async (req, res) => {
    try {
        const newItem = new MiColeccion({
            name: req.body.name,
            description: req.body.description || '',
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        console.error('Error', error);
        res.status(500).send('Error adding item');
    }
});

app.delete('/api/mis_skills/:id', async (req, res) => {
    try {
        const deletedItem = await MiColeccion.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).send('Item not found');
        }
        res.status(200).json(deletedItem);
    } catch (error) {
        console.error('Error', error);
        res.status(500).send('Error deleting item');
    }
});
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server on ${PORT}`));