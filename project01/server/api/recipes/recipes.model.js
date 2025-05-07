import mongoose from "mongoose";
let Schema = mongoose.Schema;

let reviewSchema = Schema({
    description: {type: String},
    rating: {type: Integer},
    date: {type: Timestamp},
    user : {type: ObjectId}
});

let ingredientSchema = Schema({
    name: {type: String},
    amount: {type: Integer}
});

let recipeSchema = Schema({
    name: {type: String},
    description: {type: String},
    image: {type: String},
    prepTime: {type: Integer},
    cookTime: {type: Integer},
    directions: {type: Array},
    ingredients: {type: Array},
    reviews: {type: Array}
});

let Review = mongoose.model('Review', reviewSchema);
let Ingredient = mongoose.model('Ingredient', ingredientSchema);
let Recipe = mongoose.model('Recipe', recipeSchema);

export {Review, Ingredient, Recipe};