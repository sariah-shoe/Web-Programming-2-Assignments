const BACKEND_URL = import.meta.env.DEV ? "http://localhost:3000/" : import.meta.env.BASE_URL;

function load_all() {
    return fetch(`${BACKEND_URL}api/recipes`)
}

function load_one({ params }) {
    return fetch(`${BACKEND_URL}api/recipes/${ params.id }`);
}

async function load_review_and_users({ params }) {
  const [recipeRes, usersRes] = await Promise.all([
    fetch(`${BACKEND_URL}api/recipes/${params.id}`),
    fetch(`${BACKEND_URL}api/users`)
  ]);

  if (!recipeRes.ok || !usersRes.ok) {
    throw new Response('Failed to fetch data', { status: 500 });
  }

  const recipe = await recipeRes.json();

  // 👇  unwrap the array
  const { users = [] } = await usersRes.json();

  const review =
    params.reviewId &&
    recipe.reviews.find(r => r._id === params.reviewId) ||
    null;

  return { recipe, review, users }; 
}


export {load_all, load_one, load_review_and_users}