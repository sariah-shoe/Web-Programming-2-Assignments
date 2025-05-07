'use strict';

import {Review, Ingredient, Recipe} from './recipes.model.js';

// Find all Recipes
export function index(req, res) {
  Recipe.find()
    .populate('ingredient')
    .populate('review')
    .exec()
    .then(function(recipes) {
      res.json({
        recipes
      });
    })
    .catch(function(err) {
      res.status(500);
      res.send(err);
    });
}

// Find details for one recipe
export function show(req, res) {
  recipe.findById(req.params.id)
    .populate('ingredient')
    .populate('review')
    .exec()
    .then(function(existingRecipe) {
      if(existingRecipe) {
        // recipe was found by Id
        res.status(200);
        res.json(existingRecipe);
      } else {
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Create a new recipe
export function create(req, res) {
  let ingredients = req.body.ingredients;
  let recipe = req.body;
  Ingredient.create(ingredients)
    .then(function(createdIngredients) {
      recipe.ingredients = createdIngredients;
      return Recipe.create(recipe);
    })
    .then(function(createdrecipe) {
      res.status(201);
      res.json(createdrecipe);
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Update a recipe
export function update(req, res) {
  // Start by trying to find the recipe by its id
  Recipe.findById(req.params.id)
    .populate('ingredient')
    .populate('review')
    .exec()
    .then(function(existingRecipe) {
      // If recipe exists, update all fields of the object
      if(existingRecipe) {
        existingRecipe.name = req.body.name;
        existingRecipe.description = req.body.description;
        existingRecipe.image = req.body.image;
        existingRecipe.prepTime = req.body.prepTime;
        existingRecipe.cookTime = req.body.cookTime;
        existingRecipe.directions = req.body.directions;

        /*
         Promise.all takes an array of promises as an argument
         It ensures that all the promises in the array have successfully resolved before
         continuing the promise chain. It will pass to the next .then an array of results, one
         for each promise that was passed
        */
        return Promise.all([
          existingrecipe.address.increment().save(),
          existingrecipe.increment().save()
        ]);
      } else {
        // recipe was not found
        return existingrecipe;
      }
    })
    // This .then will be called after the Promise.all resolves, or be called with null if the recipe was not found
    .then(function(savedObjects) {
      // savedObjects should be defined if Promise.all was invoked (recipe was found)
      if(savedObjects) {
        res.status(200);
        // The order of responses are guaranteed to be the same as the order of the promises, so we can assume
        // the second element of the array is the result of the recipe update
        res.json(savedObjects[1]);
      } else {
        // recipe was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    // Error encountered during the save of the recipe or address
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Remove a recipe
export function destroy(req, res) {
  recipe.findById(req.params.id)
    .populate('address')
    .exec()
    .then(function(existingrecipe) {
      if(existingrecipe) {
        /*
          This is the equivalent of cascading delete in a relational database
          If the recipe was found, remove both the recipe object and the address object from
          their respective collections. Only record the delete as successful if both objects
          are deleted
         */
        return Promise.all([
          existingrecipe.address.deleteOne(),
          existingrecipe.deleteOne()
        ]);
      } else {
        return existingrecipe;
      }
    })
    // Delete was successful
    .then(function(deletedrecipe) {
      if(deletedrecipe) {
        res.status(204).send();
      } else {
        // recipe was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    // Address or recipe delete failed
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

