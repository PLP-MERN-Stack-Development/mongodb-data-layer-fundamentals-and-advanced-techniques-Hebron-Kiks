
//Find all books in a specific genre
db.books.find({genre: "Fiction"})

//Find books published after a certain year
db.books.find({published_year: 1988})

//Find books by a specific author
db.books.find({ author: "Paulo Coelho" });

//Update the price of a specific book
db.books.updateOne(
  {title:"The Alchemist"},
  {$set: { price:20.56}}
);

//Delete a book by its title
db.books.deleteOne({title: "The Catcher in the Rye"})

// Write a query to find books that are both in stock and published after 2010
db.books.find({
  $and: [
    { in_stock: true },
    { published_year: { $gt: 2010 } }
  ]
});

//Use projection to return only the title, author, and price fields in your queries
db.books.find({
  $and: [
    { in_stock: true},
    { published_year: { $gt: 1945}}
  ]
},{title:1, author:1, price:1, _id:0})

// Implement sorting to display books by price (both ascending and descending)

db.books.find({}, {title:1, author:1, price:1, _id:0}).sort({price:1});
db.books.find({}, {title:1, author:1, price:1, _id:0}).sort({price:-1});
//Use the `limit` and `skip` methods to implement pagination (5 books per page)
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })
  .skip(5)
  .limit(5);
// Create an aggregation pipeline to calculate the average price of books by genre

db.books.aggregate([{
  $group: { _id:"$genre", averagePrice: {$avg: "$price"} }
}]);

//Create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
  {$group: {_id:"$author", totalBooks: {$sum:1}}},
  {$sort: {totalBooks: -1}},
  {$limit:1}
])

//Implement a pipeline that groups books by publication decade and counts them

db.books.aggregate([
  {
    $addFields: {
      decade: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 } // sort by decade
  }
]);

//Create an index on the `title` field for faster searches
db.books.createIndex({ title: 1 });

//Create a compound index on `author` and `published_year`

db.books.createIndex({ author: 1, published_year: -1 });


//Use the `explain()` method to demonstrate the performance improvement with your indexes
db.books.find({ title: "Atomic Habits" }).explain("executionStats");






