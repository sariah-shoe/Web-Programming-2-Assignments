'use strict';

import {User} from './users.model.js';

// Find all Users
export function index(req, res) {
  /*
   The pattern you see below where one function is
   called right after the other is called method chaining,
   and is a common practice in JavaScript and many other languages
   https://en.wikipedia.org/wiki/Method_chaining
   */
  User.find()
    /*
       For each user object, populate the address attribute.
       This will make all the attributes available in the address
       accessible as though the address were a subdocument by joining
       the two tables for you
       http://mongoosejs.com/docs/populate.html
    */
    /*
       exec() runs the query and returns a promise object.
       Promises are a cleaner way to chain asynchronous actions together than
       callbacks because, instead of nesting functions within functions, you can
       chain function calls together and pass the return value from one function
       as the argument to the next! It also allows you to have one method to handle
       exceptions, instead of having to provide them in each callback function you write
       http://www.javascriptkit.com/javatutors/javascriptpromises.shtml
       http://bluebirdjs.com/docs/why-promises.html
    */
    .exec()
    // This then method will only be called if the query was successful, so no need to error check!
    .then(function(users) {
      res.json({
        users
      });
    })
    /*
     Any errors encountered here must be server side, since there are no arguments to the find
     Return 500 (server error) and send the error encountered back to the requester
    */
    .catch(function(err) {
      res.status(500);
      res.send(err);
    });
}

// Find details for one user
export function show(req, res) {
  User.findById(req.params.id)
    .exec()
    .then(function(existingUser) {
      /*
       findById will return null if the object was not found
       This if check will evaluate to false for a null user
      */
      if(existingUser) {
        // User was found by Id
        res.status(200);
        res.json(existingUser);
      } else {
        // User was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Create a new user
export function create(req, res) {
  let user = req.body;
  User.create(user)
  .then(function(createdUser){
    res.status(201).json(createdUser);
  })
  .catch(function(err){
    res.status(400);
    res.send(err);
  });
}

// Update a user
export function update(req, res) {
  // Start by trying to find the user by its id
  User.findById(req.params.id)
    .exec()
    // Update user and address
    .then(function(existingUser) {
      // If user exists, update all fields of the object
      if(existingUser) {
        existingUser.username = req.body.username;
        existingUser.email = req.body.email;
        existingUser.name.firstName = req.body.name.firstName;
        existingUser.name.middleName = req.body.name.middleName;
        existingUser.name.lastName = req.body.name.lastName;
        /*
         Promise.all takes an array of promises as an argument
         It ensures that all the promises in the array have successfully resolved before
         continuing the promise chain. It will pass to the next .then an array of results, one
         for each promise that was passed
        */
        return Promise.all([
          existingUser.increment().save()
        ]);
      } else {
        // User was not found
        return existingUser;
      }
    })
    // This .then will be called after the Promise.all resolves, or be called with null if the user was not found
    .then(function(savedObjects) {
      // savedObjects should be defined if Promise.all was invoked (user was found)
      if(savedObjects) {
        res.status(200);
        // The order of responses are guaranteed to be the same as the order of the promises, so we can assume
        // the second element of the array is the result of the user update
        res.json(savedObjects[1]);
      } else {
        // User was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    // Error encountered during the save of the user or address
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Remove a user
export function destroy(req, res) {
  User.findById(req.params.id)
    .exec()
    .then(function(existingUser) {
      if(existingUser) {
        return Promise.all([
          existingUser.deleteOne()
        ]);
      } else {
        return existingUser;
      }
    })
    // Delete was successful
    .then(function(deletedUser) {
      if(deletedUser) {
        res.status(204).send();
      } else {
        // User was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    // Address or user delete failed
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

