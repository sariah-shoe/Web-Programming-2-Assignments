import * as users from './api/users/index.js';
import * as recipes from './api/recipes/index.js'
import path from 'path'
import express from 'express'

export default (app) => {
    app.use(express.static("public"));
    app.use('/api/users', users.router);
    app.use('/api/recipes', recipes.router);
    app.use("/{*splat}", (req, res) => {
        res.sendFile(path.resolve(`public/index.html`));
    });
}