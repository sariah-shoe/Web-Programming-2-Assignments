'use strict';

import { Review, Ingredient, Recipe } from './recipes.model.js';
import { User } from '../users/users.model.js';

// Find all Recipes
export function index(req, res) {
  Recipe.find()
    .populate({ path: 'reviews.user', select: 'username' })
    .exec()
    .then(function (recipes) {
      res.json({
        recipes
      });
    })
    .catch(function (err) {
      res.status(500);
      res.send(err);
    });
}

// Find details for one recipe
export function show(req, res) {
  Recipe.findById(req.params.id)
    .populate({ path: 'reviews.user', select: 'username' })
    .exec()
    .then(function (existingRecipe) {
      if (existingRecipe) {
        // recipe was found by Id
        res.status(200);
        res.json(existingRecipe);
      } else {
        res.status(404);
        res.json({ message: 'Not Found' });
      }
    })
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

// Create a new recipe
export function create(req, res) {
  let recipe = req.body;

  Recipe.create(recipe)
    .then(function (createdRecipe) {
      res.status(201).json(createdRecipe);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

// Update a recipe
export function update(req, res) {
  // Start by trying to find the recipe by its id
  Recipe.findById(req.params.id)
    .exec()
    .then(function (existingRecipe) {
      // If recipe exists, update all fields of the object
      if (existingRecipe) {
        existingRecipe.name = req.body.name;
        existingRecipe.description = req.body.description;
        existingRecipe.image = req.body.image;
        existingRecipe.prepTime = req.body.prepTime;
        existingRecipe.cookTime = req.body.cookTime;
        existingRecipe.directions = req.body.directions;
        existingRecipe.ingredients = req.body.ingredients;

        /*
         Promise.all takes an array of promises as an argument
         It ensures that all the promises in the array have successfully resolved before
         continuing the promise chain. It will pass to the next .then an array of results, one
         for each promise that was passed
        */
        return Promise.all([
          existingRecipe.increment().save()
        ]);
      } else {
        // recipe was not found
        return existingRecipe;
      }
    })
    // This .then will be called after the Promise.all resolves, or be called with null if the recipe was not found
    .then(function (savedObjects) {
      // savedObjects should be defined if Promise.all was invoked (recipe was found)
      if (savedObjects) {
        res.status(200);
        // The order of responses are guaranteed to be the same as the order of the promises, so we can assume
        // the second element of the array is the result of the recipe update
        res.json(savedObjects[1]);
      } else {
        // recipe was not found
        res.status(404);
        res.json({ message: 'Not Found' });
      }
    })
    // Error encountered during the save of the recipe or address
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

// Remove a recipe
export function destroy(req, res) {
  Recipe.findById(req.params.id)
    .exec()
    .then(function (existingRecipe) {
      if (existingRecipe) {
        return Promise.all([
          existingRecipe.deleteOne()
        ]);
      } else {
        return existingRecipe;
      }
    })
    // Delete was successful
    .then(function (deletedRecipe) {
      if (deletedRecipe) {
        res.status(204).send();
      } else {
        // Recipe was not found
        res.status(404);
        res.json({ message: 'Not Found' });
      }
    })
    // Recipe delete failed
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

// Create a review
export function createReview(req, res) {
  User.findOne({ username: req.body.user })
    .then(function (user) {
      if (user) {
        return Review.create({
          description: req.body.description,
          rating: req.body.rating,
          user: user._id
        });
      } else {
        throw { status: 404, message: "User Not Found" };
      }
    })
    .then(function (newReview) {
      return Recipe.findById(req.params.recipeId).exec()
        .then(function (existingRecipe) {
          if (existingRecipe) {
            existingRecipe.reviews.push(newReview);
            return existingRecipe.save();
          } else {
            throw { status: 404, message: "Recipe Not Found" };
          }
        });
    })
    .then(function (updatedRecipe) {
      res.status(201).json(updatedRecipe);
    })
    .catch(function (err) {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(400).send(err);
      }
    });
}

// Update a review
// PUT /api/recipes/:recipeId/reviews/:reviewId
export async function updateReview(req, res) {
  try {
    const user = await User.findOne({ username: req.body.user }).exec();
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }
    const review = await Review.findById(req.params.reviewId).exec();
    if (!review) {
      return res.status(404).json({ message: 'Review Not Found' });
    }

    review.description = req.body.description;
    review.rating      = req.body.rating;
    review.user        = user._id;

    const updatedReview = await review.save();

    const recipe = await Recipe.findById(req.params.recipeId).exec();
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe Not Found' });
    }

    const idx = recipe.reviews.findIndex(
      r => r._id.toString() === updatedReview._id.toString()
    );
    if (idx === -1) {
      return res
        .status(404)
        .json({ message: 'Review Not Found in Recipe' });
    }

    recipe.reviews[idx] = updatedReview;
    await recipe.save();
    res.status(200).json(recipe);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}



// Remove a review
export function destroyReview(req, res) {
  Review.findById(req.params.reviewId)
  .exec()
  .then(function(existingReview){
    if (existingReview){
      return existingReview.deleteOne();
    } else {
      throw {status: 404, message: "Review not found"};
    }
  })
  .then(function (){
    return Recipe.findById(req.params.recipeId).exec()
    .then(function(existingRecipe){
      if (existingRecipe){
        const reviewIndex = existingRecipe.reviews.findIndex(review => review._id.toString() === req.params.reviewId.toString());
        if (reviewIndex !== -1) {
          existingRecipe.reviews.splice(reviewIndex, 1);
          return existingRecipe.save();
        } else {
          throw { status: 404, message: "Review Not Found in Recipe" };
        }
      }
      else {
        throw { status: 404, message: "Recipe Not Found" };
      }
    });
  })
  .then(function () {
    res.status(204).send();
  })
  .catch(function (err) {
    if (err.status) {
      res.status(err.status).json({ message: err.message });
    } else {
      res.status(400).send(err);
    }
  });
}

