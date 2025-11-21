import { Form, Link, useLoaderData} from 'react-router-dom';
import ChangeIngredient from './change-ingredient';
import ChangeDirections from './change-directions';
import styles from './crupdateCSS/recipe-crupdate.module.css';

export default function RecipeCrupdate() {
  const recipe = useLoaderData();
  return (
    <Form className={styles.form}
    action={ recipe ? `/recipes/update/${ recipe._id }` : '/recipes/create' } method={ recipe ? 'put' : 'post' }>
      <Link to={'/recipes'}>Return to Recipe List</Link>

      <label className={styles.label}>
        Name:
        <input name="name" className={styles.input} defaultValue={recipe && recipe.name}/>
      </label>
      <label className={styles.label}>
        Description:
        <input name="description" className={styles.input} defaultValue={recipe && recipe.description} />
      </label>
      <label className={styles.label}>
        Image URL:
        <input name="image" className={styles.input} defaultValue={recipe && recipe.image} />
      </label>
      <label className={styles.label}>
        Preparation Time:
        <input name="prepTime" type="number" className={styles.input} defaultValue={recipe && recipe.prepTime} />
      </label>
      <label className={styles.label}>
        Cook Time:
        <input name="cookTime" type="number" className={styles.input} defaultValue={recipe && recipe.cookTime} />
      </label>

      <h3>Ingredients</h3>
        <ChangeIngredient></ChangeIngredient>

      <h3>Directions</h3>
        <ChangeDirections></ChangeDirections>

      <div>
        <input type="submit" className={styles.submit}/>
      </div>
    </Form>
  );
}
