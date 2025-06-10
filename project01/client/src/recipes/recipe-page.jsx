import { Link, useLoaderData } from 'react-router-dom';
import RecipeDetails from './recipe-details';
import RecipeReviews from './recipe-reviews';
import styles from "./recipeCSS/recipe-page.module.css";

export default function RecipePage(){
    const recipe = useLoaderData();
    return(
        <div className={styles.body}>
            <RecipeDetails></RecipeDetails>
            <Link to={'/recipes'}>Return to Recipe List</Link>
            <h2>Reviews</h2>
            <Link to={`/recipes/${recipe._id}/reviews`}>Create Review</Link>
            <RecipeReviews></RecipeReviews>
        </div>
    )
}