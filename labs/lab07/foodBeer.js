// Find all towns whose name contains an e and are famous for food or beer
db.towns.find({
    'name': {$regex: /e/i},
    $or: [
        {'famousFor': 'food'}, 
        {'famousFor': 'beer'}
    ]
});