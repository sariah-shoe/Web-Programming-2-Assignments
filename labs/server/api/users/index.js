import express from 'express';
import * as users from './users.js';
let router = express.Router();
export {router};
router.get('/', users.listContents);
router.get('/:id', users.findOne);
router.post('/', users.createUser);