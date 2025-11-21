import { useState } from 'react';
import {useLoaderData} from 'react-router-dom';
import styles from './crupdateCSS/recipe-crupdate.module.css';

export default function ChangeIngredient() {
  const recipe = useLoaderData();
  const [ingredients, setIngredients] = useState(() =>
    recipe?.ingredients?.length
      ? recipe.ingredients.map(({ name, amount }) => ({ name, amount }))
      : [{ name: '', amount: '' }]
  );

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '' }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <label className={styles.label}>
            Name:
            <input
              name={`ingredients[${index}].name`}
              value={ingredient.name}
              onChange={(e) =>
                handleIngredientChange(index, 'name', e.target.value)
              }
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Amount:
            <input
              name={`ingredients[${index}].amount`}
              value={ingredient.amount}
              onChange={(e) =>
                handleIngredientChange(index, 'amount', e.target.value)
              }
              className={styles.input}
            />
          </label>
          <button type="button" onClick={() => removeIngredient(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addIngredient}>Add Ingredient</button>
    </>
  );
}
