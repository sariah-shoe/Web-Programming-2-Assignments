import * as users from './api/users/index.js';
import * as recipes from './api/recipes/index.js'

export default (app) => {
    app.route("/")
        .get((req, res) => {
        res.send("Hello World!");
    }); 
    app.use('/api/users', users.router);
    app.use('/api/recipes', recipes.router);
}