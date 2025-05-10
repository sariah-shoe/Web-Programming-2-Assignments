import mongoose from "mongoose";
let Schema = mongoose.Schema;

let reviewSchema = Schema({
    description: {type: String},
    rating: {type: Number},
    user : {type: mongoose.ObjectId}
},
{timestamps: true});

let ingredientSchema = Schema({
    name: {type: String},
    amount: {type: String}
});

let recipeSchema = Schema({
    name: {type: String},
    description: {type: String},
    image: {type: String},
    prepTime: {type: Number},
    cookTime: {type: Number},
    directions: {type: Array},
    ingredients: [ingredientSchema],
    reviews: [reviewSchema]
});

let Review = mongoose.model('Review', reviewSchema);
let Ingredient = mongoose.model('Ingredient', ingredientSchema);
let Recipe = mongoose.model('Recipe', recipeSchema);

export {Review, Ingredient, Recipe};