/*Task2: Basic CRUD Operations*/


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





