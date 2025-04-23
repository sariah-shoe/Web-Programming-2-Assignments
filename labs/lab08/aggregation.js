// Create an aggregation query that shows the sum of the population for the cities in each country in a European (Europe/) timezone, sorted by country in descending order.
db.cities.aggregate([{
    $match : {
        "timezone" : {
            $regex : /^Europe/
        }}}, {
    $group: {
        _id : "$country",
        totalPopulation : {
            $sum : "$population"
        }}}, {
    $sort : {
        _id: -1
    }}
])