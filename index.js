import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "books",
    password: "admin",
    port: 5432
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

db.connect();

let books = [];


app.get("/", async (req,res) => {
    let result = await db.query("SELECT * FROM my_books");
    // console.log(result.rows);
    books = await result.rows.map(({book_id: bId, title, isbn, cover_image_url: bookImage, review: bookReview, rating: bookRatings, last_update: lastUpdated}) => {
       let numBId = Number(bId);
       let numIsbn = Number(isbn);
       let numBookRatings = Number(bookRatings);
       let dte = new Date(lastUpdated).toLocaleDateString("en-CA");
        return { 
            bId:numBId,
            title,
            isbn:numIsbn,
            bookImage,
            bookReview,
            bookRatings:numBookRatings,
            lastUpdated:dte 
        }
    });
    
    res.render("index.ejs", {books:books});
});

app.get("/view", (req,res) => {
    const bookID = req.body.view;
    
    const book = books.find(b => b.bId === Number(bookID));
    res.render("view.ejs", { book:book });
});

app.get("/edit", (req,res) => {
    const bookID = req.body.edit;
    const book = books.find(b => b.bId === Number(bookID));
    res.render("edit.ejs", { book:book });
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/submit", async (req, res) => {
  if (req.body.create === "create") {
    let bookTitle = req.body["book-title"];
    let bookISBN = req.body["book-isbn"];
    let bookReview = req.body["book-review"];
    let bookImage = imgURLBuilder(bookISBN) || "";
    let bookRating = Number(req.body["rating-value"]);
    let dateUpdated = new Date().toLocaleDateString("en-CA");

    const result = await db.query(
      "INSERT INTO my_books (title, isbn, cover_image_url, review, rating, last_update) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [bookTitle, bookISBN, bookImage, bookReview, bookRating, dateUpdated]
    );

    res.redirect("/");
  }
});

app.patch("/update", async (req,res) => {
    let bookID = Number(req.body.update);
    let bookTitle = req.body["book-title"];
    let bookISBN = req.body["book-isbn"];
    let bookImage = imgURLBuilder(bookISBN) || "";
    let bookReview = req.body["book-review"];
    let bookRating = Number(req.body["rating-value"]);
    let dateUpdated = new Date().toLocaleDateString("en-CA");

    const result = await db.query(
      `UPDATE my_books SET
        title =  $1,
        isbn = $2,
        cover_image_url = $3,
        review = $4,
        rating = $5,
        last_update = $6
        WHERE  book_id = $7
       RETURNING *`,
      [bookTitle, bookISBN, bookImage, bookReview, bookRating, dateUpdated, bookID]
    );
    res.redirect("/");
});

app.delete("/delete", async (req, res) => {
    let bookID = Number(req.body.delete);
    const result = await db.query("DELETE FROM my_books WHERE book_id = $1 ",[bookID]);
    res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


function imgURLBuilder(isbn) { 
        let imgURL = "";
        const apiURL = "https://covers.openlibrary.org/b/isbn"
        const bookISBN = isbn;
        const coverSize = "M";
        imgURL = `${apiURL}/${bookISBN}-${coverSize}.jpg`;
        return imgURL;
     }