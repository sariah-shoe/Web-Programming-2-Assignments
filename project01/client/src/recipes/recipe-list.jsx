import { Link, useLoaderData } from 'react-router-dom';
import styles from "./recipeCSS/recipe-list.module.css";

export default function UserList() {
    const { recipes } = useLoaderData();

    let rows = recipes.map(recipe => <tr key={recipe._id}>
        <td className={styles.cell}>{recipe.name}</td>
        <td className={styles.cell}>{recipe.description}</td>
        <td className={styles.cell}>
            <img
                src={recipe.image}
                alt={`Photo of ${recipe.name}`}
                height="200"
            />
        </td>
        <td className={styles.cell}>{`${recipe.prepTime} Minutes`}</td>
        <td className={styles.cell}>{`${recipe.cookTime} Minutes`}</td>
        <td className={styles.cell}><Link to={`/recipes/${recipe._id}`}>View Recipe</Link></td>
        <td className={styles.cell}><Link to={`/recipes/update/${recipe._id}`}>Update Recipe</Link></td>
        <td className={styles.cell}><Link to={`/recipes/delete/${recipe._id}`}>Delete Recipe</Link></td>
    </tr>)
    return (
        <div className={styles.body}>
            <h1>Recipe List</h1>
            <Link to={'/'} className={styles.link}>Return to Home</Link>
            <Link to={'/recipes/create'} className={styles.link}>Create New Recipe</Link>
            <table>
                <thead>
                    <tr>
                        <th className={styles.cell}>Name</th>
                        <th className={styles.cell}>Description</th>
                        <th className={styles.cell}>Image</th>
                        <th className={styles.cell}>Preperation Time</th>
                        <th className={styles.cell}>Cook Time</th>
                        <th className={styles.cell}></th>
                        <th className={styles.cell}></th>
                        <th className={styles.cell}></th>
                    </tr>
                </thead>
                <tbody>
                { rows }
                </tbody>
            </table>
        </div>
    )
}