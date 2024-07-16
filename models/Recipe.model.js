const { Schema, model } = require('mongoose')

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy peasy', 'Normal', 'Chef'],
    default: 'Easy peasy',
  },
})

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe
// export default Recipe
