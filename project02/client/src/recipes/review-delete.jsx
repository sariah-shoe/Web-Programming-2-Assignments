import { Form, Link, useLoaderData } from 'react-router-dom';
import styles from "./recipeCSS/recipe-delete.module.css";

export default function ReviewDelete(){
    const  { recipe, review, users }  = useLoaderData();

    return(
        <div className={styles.body}>
            <h1>Are you sure you want to delete the review for {recipe.name}?</h1>
            <div>
                <p>{review.rating} / 5</p>
                <p>{review.user.username}</p>
                <p>{review.description}</p>
            </div>
            <Link to={`/recipes/${recipe._id}`} className={styles.link}>Return to Recipe</Link>
            <Form  action={`/recipes/${recipe._id}/reviews/delete/${review._id}`} method={ 'delete' }>
                <input type="submit" value={`Delete review`}></input>
            </Form>

        </div>
    )
}