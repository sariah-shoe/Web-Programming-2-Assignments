import { Form, Link, useLoaderData } from 'react-router-dom';
import styles from "./recipeCSS/recipe-delete.module.css";

export default function RecipeDelete(){
    const recipe = useLoaderData();

    return(
        <div className={styles.body}>
            <h1>Are you sure you want to delete {recipe.name}?</h1>
            <img
                src={recipe.image}
                alt={`Photo of ${recipe.name}`}
                height="200"
                width="200"
            />
            <Link to={"/recipes"} className={styles.link}>Return to Recipe List</Link>
            <Form  action={`/recipes/delete/${ recipe._id }`} method={ 'delete' }>
                <input type="submit" value={`Delete ${recipe.name}`}></input>
            </Form>

        </div>
    )
}