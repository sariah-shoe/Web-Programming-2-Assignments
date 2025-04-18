import {v4 as uuidv4} from 'uuid';
import User from './users.model.js';

export function index(req, res) {
    res.status(200).json(User.find());
}

export function show(req, res) {
    let result = User.findById(req.params.id);
    if(result === null){
        res.status(404).json({message: "Not Found"});
    } else {
        res.status(200).json({message: result});
    }
}

export function create(req, res){
    let newUser = User.create(req);
    res.status(201).json({message: "New user created.", location: "/api/users/" + newUser.id});
}

export function upsert(req, res){
    if(User.findOneAndUpdate(req)){
        res.status(200).json({message: "User id " + req.params.id + " updated.", location: "/api/users/" + req.params.id});
    } else {
        res.status(201).json({message: "New user created.", location: "/api/users/" + req.params.id}); 
    }
}

export function destroy(req, res){
    if(User.remove(req.params.id)){
        res.status(204).json({message: "User id " + req.params.id + " removed."});
    } else {
        res.status(404).json({message: "Not found"});
    }
}