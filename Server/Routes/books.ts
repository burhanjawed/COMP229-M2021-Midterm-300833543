// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books List page. READ */
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        page: 'books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/details', (req, res, next) => {

  res.render('books/details', {title: 'Add Book', page: '/books/details', books: ''});

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/details', (req, res, next) => {

  // instantiate a new book
  let newBook = new book
  ({
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
  });

  //db.book.insert
  book.create(newBook, (err) => {
      if(err)
      {
          console.error(err);
          res.end(err);
      }

      res.redirect('/books');
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/details/:id', (req, res, next) => {

  let id = req.params.id;

  // pass the id to db
  book.findById(id, {}, {}, (err, bookItemToEdit) =>
  {
      if(err)
      {
          console.error(err);
          res.end(err);
      }

      // show the edit view
      res.render('books/details', {title: 'Edit Book', page: '/books/details', books: bookItemToEdit});
  });
});

// POST - process the information passed from the details form and update the document
router.post('/details/:id', (req, res, next) => {

  let id = req.params.id;

  // instantiate a new Book
  let updatedBook = new book
  ({
    "_id": id,
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  // find the book by id and update
  book.updateOne({_id: id}, updatedBook, {}, (err) =>{
      if(err)
      {
          console.error(err);
          res.end(err);
      }

      res.redirect('/books');
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;

  //db.book.remove
  book.remove({_id: id}, (err) => {
      if(err)
      {
          console.error(err);
          res.end(err);
      }

      res.redirect('/books');
  });
});


//module.exports = router;
