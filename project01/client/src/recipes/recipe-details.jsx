import styles from "./recipeCSS/recipe-page.module.css";
import {useLoaderData } from 'react-router-dom';

export default function RecipeDetails() {
    const recipe = useLoaderData();
    let ingredients = recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient.amount} {ingredient.name}</li>)
    let directions = recipe.directions.map((direction, index) => <li key={index}>{direction}</li>)
    return (
        <div>
            <h1>{recipe.name}</h1>
            <img
                src={recipe.image}
                alt={`Photo of ${recipe.name}`}
                height="200"
                width="200"
            />
            <p>{recipe.description}</p>
            <p>Preperation Time: {recipe.prepTime} Minutes</p>
            <p>Cook Time: {recipe.cookTime} Minutes</p>
            <h2>Ingredients</h2>
            <ul className={styles.list}>
                { ingredients }
            </ul>
            <h2>Directions</h2>
            <ol className={styles.list}>
                { directions }
            </ol>
        </div>
    )
}