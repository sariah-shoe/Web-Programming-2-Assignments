// Insert a new article with an author name and email, creation date, and text

// use blogger
db.articles.insertOne({
    'name' : 'Sariah Shoemaker',
    'email' : 'sariah.shoemaker@du.edu',
    'creationDate' : '4-22-2025',
    'text' : 'Wow look at my blog post!'
});