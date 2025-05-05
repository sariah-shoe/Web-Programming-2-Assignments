import mongoose from "mongoose";
let Schema = mongoose.Schema;

let reviewSchema = Schema({
    description: {type: String},
    rating: {type: Integer},
    date: {type: Timestamp},
    user : {type: ObjectId}
});

let ingredientSchema = Schema({
    list: { 
        name: {type: String},
        unit: {type: String},
        quantity: {type: Integer}
    }
});

let recipeSchema = Schema({
    name: {type: String},
    description: {type: String},
    picture: {type: String},
    prepTime: {type: Integer},
    cookTime: {type: Integer},
    directions: {type: Array},
    ingredients: ingredientSchema,
    reviews: {type: Array}
});

let Review = mongoose.model('Review', reviewSchema);
let Ingredient = mongoose.model('Ingredient', ingredientSchema);
let Recipe = mongoose.model('Recipe', recipeSchema);

export {Review, Ingredient, Recipe};