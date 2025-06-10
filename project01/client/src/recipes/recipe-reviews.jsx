import { Link, useLoaderData } from 'react-router-dom';
import styles from "./recipeCSS/recipe-page.module.css";

export default function RecipeReviews() {
    const recipe = useLoaderData();

    let cards = recipe.reviews.map(review => <div className={styles.review} key={review._id}>
        <p>{review.rating} / 5</p>
        <p>{review.user.username}</p>
        <p>{review.description}</p>
        <Link className={styles.link} to={`/recipes/${recipe._id}/reviews/${review._id}`}>Update Review</Link>
        <Link className={styles.link} to={`/recipes/${recipe._id}/reviews/delete/${review._id}`}>Delete Review</Link>
    </div>)
    return (
        <div>
            {cards}
        </div>
    )
}