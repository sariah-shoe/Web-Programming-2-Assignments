import {v4 as uuidv4} from 'uuid';

let users = [];

export function listContents(req, res) {
    console.log("Requested all users");
    console.log(users);
    res.json(users);
}

export function findOne(req, res) {
    var currUser = users.filter(function(user){
        if(user.id == req.params.id){
            return true;
        }
    });
    if(currUser.length == 1){
        res.json(currUser[0]);
    } else {
        res.json({message: "Not Found"});
        res.status(404).send();
    }
}

export function createUser(req, res){
    let newId = uuidv4();
    users.push({
        id: newId,
        name: req.body.name,
        address: req.body.address,
        age: req.body.age
    });
    res.json({message: "New user created.", location: "/api/users/" + newId});
    res.status(201).send();
}

export function updateUser(req, res){
    var updateIndex = users.map(function(user){
        return user.id;
    }).indexOf(parseInt(req.params.id));

    if(updateIndex === -1){
        users.push({
            id: req.params.id,
            name: req.body.name,
            address: req.body.address,
            age: req.body.age
        });
        res.json({message: "New user created.", location: "/api/users/" + req.params.id}); 
        res.status(201).send();     
    } else {
        users[updateIndex] = {
            id: req.params.id,
            name: req.body.name,
            address: req.body.address,
            age: req.body.age     
        }
        res.json({message: "User id " + req.params.id + " updated.", location: "/api/users/" + req.params.id});
        res.status(200).send();
    }
}

export function deleteUser(req, res){
    var removeIndex = users.map(function(user){
        return(user.id);
    }).indexOf(req.params.id);

    if(removeIndex == -1){
        res.json({message: "Not found"});
        res.status(404).send();
    } else {
        users.splice(removeIndex, 1);
        res.json({message: "User id " + req.params.id + " removed."});
        res.status(204).send();
    }
}