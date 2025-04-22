// Find a town containing the word new
db.towns.find({
    'name' : {$regex: /new/i}
});