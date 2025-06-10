import { createBrowserRouter } from "react-router-dom";
import Root from "./root/root";
import RecipeList from "./recipes/recipe-list";
import RecipePage from "./recipes/recipe-page";
import RecipeCrupdate from "./recipes/crupdates/recipe-crupdate";
import ReviewCrupdate from "./recipes/crupdates/review-crupdate";
import * as recipes from "./recipes/recipe-loaders.js";
import * as recipeActions from "./recipes/recipe-actions.js";
import RecipeDelete from "./recipes/recipe-delete.jsx";
import ReviewDelete from "./recipes/review-delete.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />
    },
    {
        path: "/recipes",
        element: <RecipeList />,
        loader: recipes.load_all
    },
    {
        path: "/recipes/:id",
        element: <RecipePage />,
        loader: recipes.load_one
    },
    {
        path: "/recipes/create",
        element: <RecipeCrupdate></RecipeCrupdate>,
        action: recipeActions.create
    },
    {
        path: "/recipes/update/:id",
        element: <RecipeCrupdate></RecipeCrupdate>,
        loader: recipes.load_one,
        action: recipeActions.update
    },
    {
        path: "/recipes/:id/reviews",
        element: <ReviewCrupdate></ReviewCrupdate>,
        loader: recipes.load_review_and_users,
        action: recipeActions.create_review
    },
    {
        path: "/recipes/:id/reviews/:reviewId",
        element: <ReviewCrupdate></ReviewCrupdate>,
        loader: recipes.load_review_and_users,
        action: recipeActions.update_review
    }, {
        path: "/recipes/delete/:id",
        element: <RecipeDelete></RecipeDelete>,
        loader: recipes.load_one,
        action: recipeActions.delete_one
    }, {
        path: "/recipes/:id/reviews/delete/:reviewId",
        element: <ReviewDelete></ReviewDelete>,
        loader: recipes.load_review_and_users,
        action: recipeActions.delete_review
    }
]);

export default router;