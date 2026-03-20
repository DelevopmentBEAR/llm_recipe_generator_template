// TODO complete this file 
// LLM request here

let { GoogleGenAI, Type } = require('@google/genai')

let genAI = new GoogleGenAI( {} )

//let userInput = 'eggs and broccoli and leftover chicken'

function generateRecipe(ingredients) {

    let prompt = `Suggest one recipe that uses these ingredients
    Ingredients: ${ingredients}` 


    return genAI.models.generateContent( {
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: `You are a recipe suggestion bot for a health-conscious, 
            budget-friendly website. Suggest recipes that are low cost and use healthy ingredients. 
            You don't have to use all the ingredients the user enters, 
            especially if they enter a lot of ingredients, but use as many as possible. 
            Suggest one recipe that uses the ingredients in the prompt.
            If a user types in a ingredient that is inedible, 
            make a light joke about it and suggest a recipe related to 
            said 'ingredient' but that is still ediable. In the description, 
            please explain why this recipe is good for you and what the nutrional facts 
            are related to this recipe. Also, please add in a general budget range for the 
            recipe in the description.`, 
            responseMimeType: `application/json`,
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    recipeName: {
                        type: Type.STRING
                    },
                    description: {
                        type: Type.STRING
                    },
                    ingredients: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    },
                    instructions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    }
                }
            }
        }
    } ).then( response => {
        console.log(response.text)
        let recipe = JSON.parse(response.text)
        return recipe
    })
}

module.exports = generateRecipe