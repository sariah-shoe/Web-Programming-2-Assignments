Schemas:

Review Schema
    description: String (String because a description is a bunch of words)
    rating: Number (Number because a rating is going to be some kind of number)
    user : mongoose.ObjectId (ObjectId because it will be the Id of the user who created the object)

Ingredient Schema
    name: String (String because name is a bunch of letters)
    amount: String (Amount is a string because it is a number and then a word)

Recipe Schema
    name: String (String because name is a bunch of letters)
    description: String (String because a description is a bunch of words)
    image: String (String because a URL is a bunch of characters)
    prepTime: Number (Time is a number)
    cookTime: Number (Time is number)
    directions: Array (Directions are a list)
    ingredients: [ingredientSchema] (Ingredients are a list of ingredients)
    reviews: [reviewSchema] (Reviews are a list of reviews)

Name Schema
  firstName: String, Required  (String because a name is a bunch of letters, required because we need a name)
  middleName: String (String because a name is a bunch of letters, not required because not everyone has a middle name)
  lastName: String, Required (String because a name is a bunch of letters, required because we need a name)

User Schema
  name: nameSchema, (Uses the name schema I previously built)
  username: String, Unique (String because username is a bunch of characters, unique because usernames can't be repeated)
  email: String, Unique (String because email is a bunch of characters, unique because emails can't be repeated)

Endpoints:

/recipe endpoints
GET /
  Gets all recipes with their reviews
  Body: N/A
  Return: String of recipe objects
  Response Codes: 200, 500

GET /:id
  Gets one recipe with its reviews
  Body: N/A
  Return: A recipe object
  Response Codes: 200, 404, 400

POST /
  Add a new recipe
  Body: A recipe object
  Return: The recipe object with its new id in the database
  Response Codes: 201, 400

POST /:recipeId/reviews
  Add a new review to a recipe
  Body: A review object
  Return: The recipe object the newly created review is attached to
  Response Codes: 201, 404, 400

PUT /:id
  Update a recipe
  Body: A recipe object
  Return: The edited recipe object in the database
  Response Codes: 200, 404, 400

PUT /:recipeId/reviews/:reviewId
  Update a review in a recipe
  Body: A review object
  Return: The recipe object the edited review is attached to
  Response Codes: 200, 404, 400

DELETE /:id
  Delete a recipe
  Body: N/A
  Return: N/A
  Response Codes: 204, 404, 400

DELETE /:recipeId/reviews/:reviewId
  Deletes a review in a recipe
  Body: N/A
  Return: N/A
  Response Codes: 204, 404, 400

/user endpoints
GET /
  Get all users
  Body: N/A
  Return: A list of user objects
  Response Codes: 200, 500

GET /:id
  Get one user by their id
  Body: N/A
  Return: User object
  Response Codes: 200, 404, 400

POST /
  Create a new user
  Body: User object
  Return: Newly created user object with the id
  Response Codes: 201, 400

PUT /:id
  Update a user by id
  Body: User object
  Return: Edited user object
  Response Codes: 200, 404, 400

DELETE /:id
  Delete a user by id
  Body: N/A
  Return: N/A
  Response Codes: 204, 404, 400