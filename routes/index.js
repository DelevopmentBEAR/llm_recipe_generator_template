const express = require('express')
const router = express.Router()
const generateRecipe = require('../services/generate_recipe')

// home page here
router.get('/', function(req, res, next){
    res.render('enter_ingredients')
})

// generates LLM request
router.post('/generate_recipe', function(req, res, next){
    let formData = req.body
    let userIngredients = formData.ingredients
    console.log('User entered:', userIngredients)

    // Make a Gemini request
    generateRecipe(userIngredients).then(recipeJSON => {
        return res.render('recipe_result', {userIngredients: userIngredients, recipeJSON: recipeJSON})
    }).catch(err => { // Catches any errors
        return next(err)
    })

})

module.exports = router


