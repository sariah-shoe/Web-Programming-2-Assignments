import { redirect } from "react-router-dom";

const BACKEND_URL = import.meta.env.DEV ? "http://localhost:3000/" : import.meta.env.BASE_URL;

function extractRecipeDetails(formData) {
    // This sets my consistent inputs
    const recipe = {
        name: formData.get('name'),
        description: formData.get('description'),
        image: formData.get('image'),
        prepTime: formData.get('prepTime'),
        cookTime: formData.get('cookTime'),
        ingredients: formData.get
    }

    // This sets up my array for ingredients
    const ingredients = [];
    for (let i = 0; ; i++) {
        const name = formData.get(`ingredients[${i}].name`);
        const amount = formData.get(`ingredients[${i}].amount`);
        if (name === null && amount === null) break;
        ingredients.push({ name: name, amount: amount })
    }

    // This sets up my array for directions
    const directions = [];
    for (let i = 0; ; i++) {
        const direction = formData.get(`directions[${i}]`)
        if (direction === null) break;
        directions.push(direction);
    }

    // Add ingredients and directions to the rest of my info
    recipe.ingredients = ingredients;
    recipe.directions = directions;

    return (recipe);
}

function extractReviewDetails(formData) {
    return ({
        description: formData.get('description'),
        rating: formData.get('rating'),
        user: formData.get('user')
    })
}

async function create({ request }) {
    const formData = await request.formData()
    const newRecipe = extractRecipeDetails(formData);

    const response = await fetch(`${BACKEND_URL}api/recipes/`,
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRecipe)
        });

    if (response.ok) {
        const createdRecipe = await response.json();
        return redirect(`/recipes/${createdRecipe._id}`);
    } else {
        throw new Error("Failed to create user");
    }
}

async function update({ params, request }) {
    const formData = await request.formData();
    const updatedRecipe = extractRecipeDetails(formData);

    const response = await fetch(`${BACKEND_URL}api/recipes/${params.id}`,
        {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedRecipe)
        });

    if (response.ok) {
        return redirect(`/recipes/${params.id}`);
    } else {
        throw new Error("Failled to update recipe");
    }
}

async function delete_one({ params }) {
    const response = await fetch(`${BACKEND_URL}api/recipes/${params.id}`,
        {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        });

    if (response.ok) {
        return redirect(`/recipes`);
    } else {
        throw new Error("Failled to delete recipe");
    }
}

async function create_review({ params, request }) {
    const formData = await request.formData()
    const newReview = extractReviewDetails(formData);

    const response = await fetch(`${BACKEND_URL}api/recipes/${params.id}/reviews`,
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReview)
        });

    if (response.ok) {
        const createdReview = await response.json();
        return redirect(`/recipes/${params.id}`);
    } else {
        throw new Error("Failed to create review");
    }
}

async function update_review({ params, request }) {
    const formData = await request.formData();
    const updatedReview = extractReviewDetails(formData);

    const response = await fetch(`${BACKEND_URL}api/recipes/${params.id}/reviews/${params.reviewId}`,
        {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedReview)
        });

    if (response.ok) {
        return redirect(`/recipes/${params.id}`);
    } else {
        throw new Error("Failed to update review");
    }
}

async function delete_review({ params }) {
    const response = await fetch(`${BACKEND_URL}api/recipes/${params.id}/reviews/${params.reviewId}`,
        {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        });

    if (response.ok) {
        return redirect(`/recipes/${params.id}`);
    } else {
        throw new Error("Failed to delete review");
    }

}

export { create, update, delete_one, create_review, update_review, delete_review }