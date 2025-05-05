import * as users from './api/users/index.js';

export default (app) => {
    app.route("/")
        .get((req, res) => {
        res.send("Hello World!");
    }); 
    app.use('/api/users', users.router);
}