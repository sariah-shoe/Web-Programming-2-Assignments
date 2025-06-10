import { useState } from 'react';
import {useLoaderData} from 'react-router-dom';
import styles from './crupdateCSS/recipe-crupdate.module.css';

export default function ChangeDirection() {
  const recipe = useLoaderData();
  const [directions, setDirections] = useState(() =>
      recipe?.directions?.length
      ? recipe.directions.map(direction => direction)
      : ['']
  );

  const handleDirectionChange = (index, value) => {
    const updated = [...directions];
    updated[index] = value;
    setDirections(updated);
  };

  const addDirection = () => {
    setDirections([...directions, '']);
  };

  const removeDirection = (index) => {
    setDirections(directions.filter((_, i) => i !== index));
  };

  return (
    <>
      {directions.map((step, index) => (
        <div key={index}>
          <label  className={styles.label}>
            Step {index + 1}:
            <textarea
              name={`directions[${index}]`}
              value={step}
              onChange={(e) => handleDirectionChange(index, e.target.value)}
              className={styles.input}
            />
          </label>
          <button type="button" onClick={() => removeDirection(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addDirection}>Add Step</button>
    </>
  );
}
