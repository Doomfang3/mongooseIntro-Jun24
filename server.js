const express = require('express')
const mongoose = require('mongoose')
const Recipe = require('./models/Recipe.model')

const app = express()
app.use(express.json())

app.get('/api/recipes', async (req, res) => {
  try {
    const recipesData = await Recipe.find()

    res.json(recipesData)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

app.get('/api/recipes/:recipeId', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.recipeId)) {
      res.status(500).json('Invalid Id')
    } else {
      const recipeData = await Recipe.findById(req.params.recipeId)

      res.json(recipeData)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

app.post('/api/recipes', async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body)

    res.status(201).json(newRecipe)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

app.put('/api/recipes/:recipeId', async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.recipeId, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json(updatedRecipe)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

app.delete('/api/recipes/:recipeId', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.recipeId)) {
      res.status(500).json('Invalid Id')
    } else {
      await Recipe.findByIdAndDelete(req.params.recipeId)

      res.status(204)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

mongoose
  .connect('mongodb://127.0.0.1:27017/mongooseIntro')
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    app.listen(3001, () => {
      console.log('Listening on 3001')
    })
  })
  .catch(err => console.error('Error connecting to mongo', err))
