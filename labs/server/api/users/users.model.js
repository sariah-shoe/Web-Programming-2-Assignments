import { v4 as uuidv4 } from 'uuid';

class User {
  users = [];

  find() {
    // Returns a list of all users
    return(this.users);
  }

  findById(userId) {
    // Find user by Id
    // Returns user, or null if not present
    var currUser = this.users.find(user => user.id == userId);
    if(currUser == undefined){
      return(null);
    } else {
      return(currUser);
    }
  }

  create(user) {
    // Create a new user
    // Return created user
    // Generate the id and overwrite any id that may be present in user
    let newId = uuidv4();
    this.users.push({
        id: newId,
        name: user.body.name,
        address: user.body.address,
        age: user.body.age
    });
    return(this.users[this.users.length - 1]);
  }

  findOneAndUpdate(user) {
    // Find user and update
    // If user does not exist, create it using Id provided
    // Return true if user was updated, false if user was created
    var updateIndex = this.users.map(function(use){
      return use.id;
  }).indexOf(parseInt(user.params.id));

  if(updateIndex === -1){
    this.users.push({
      id: user.params.id,
      name: user.body.name,
      address: user.body.address,
      age: user.body.age
  });
    return(false);
  } else {
      this.users[updateIndex] = {
          id: user.params.id,
          name: user.body.name,
          address: user.body.address,
          age: user.body.age     
      }
      return(true)
  }
  }

  remove(userId) {
    // Remove user if exists with the Id provided
    // Return true if removed
    // Return false if did user not exist
    var removeIndex = this.users.map(function(user){
      return(user.id);
  }).indexOf(userId);

  if(removeIndex == -1){
      return(false);
  } else {
      this.users.splice(removeIndex, 1);
      return(true);
  }
  }
}

export default new User();
