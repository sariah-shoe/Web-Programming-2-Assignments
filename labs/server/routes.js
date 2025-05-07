import * as users from './api/users/index.js';
import express from 'express';
import path from 'path';


export default (app) => {
    app.use(express.static("public"));
    app.use('/api/users', users.router);
    app.use("/{*splat}", (req, res) => {
        res.sendFile(path.resolve('public/index.html'));
    });
}