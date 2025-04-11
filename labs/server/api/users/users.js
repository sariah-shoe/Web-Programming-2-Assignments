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
        res.status(404);
        res.json({message: "Not Found"});
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
    console.log(users);
}