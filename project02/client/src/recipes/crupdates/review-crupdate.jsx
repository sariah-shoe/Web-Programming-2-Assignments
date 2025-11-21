import { Form, Link, useLoaderData } from 'react-router-dom';
import styles from './crupdateCSS/review-crupdate.module.css';

export default function ReviewCrupdate() {
  const { recipe, review, users } = useLoaderData();

  return (
    <Form className={styles.form} action={ review ? `/recipes/${ recipe._id }/reviews/${review._id}` : `/recipes/${recipe._id}/reviews` } method={ review ? 'put' : 'post' }>
      <Link to={`/recipes/${recipe._id}`}>Return to Recipe</Link>

      <label className={styles.label}>Description:</label>
      <textarea
        name="description"
        className={styles.input}
        rows={4}
        defaultValue={ review && review.description}
      />

      <label className={styles.label}>Rating:</label>
      <input
        type="number"
        name="rating"
        className={styles.input}
        min="1"
        max="5"
        defaultValue={review && review.rating}
      />

      <label className={styles.label}>User:</label>
      <select
        name="user"
        className={styles.input}
        defaultValue={review && review.user.username}   // pre-select when editing
      >
        <option value="" disabled>Select user…</option>
        {users.map(u => (
          <option key={u.username} value={u.username}>
            {u.username}
          </option>
        ))}
      </select>

      <button type="submit" className={styles.submit}>
        Submit
      </button>
    </Form>
  );
}
