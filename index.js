import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import pg from "pg";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

const books = [
    {
        bId:1,
        title:"Book 1",
        bookImage:"",
        bookReview:"Texty Texty Texty Texty Texty Texty Texty Texty Texty Texty Texty Texty Texty Texty Texty",
        bookRatings:4,
        lastUpdated:"3 Jan 2026"
    },
    {
        bId:2,
        title:"Book 2",
        bookImage:"",
        bookReview:"2222222 Texty Texty Texty Texty Texty Texty Texty Texty Texty Texty Texty Texty Texty Texty Texty",
        bookRatings:3,
        lastUpdated:"4 Dec 2024"
    }
];

let lastID = 2;

app.get("/", (req,res) => {
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

app.post("/submit", (req, res) => {
    
    if(req.body.create === "create"){
        let bookID = lastID+1;
        let bookTitle = req.body["book-title"];
        let bookReview = req.body["book-review"];
        let bookRating = Number(req.body["rating-value"]);
        const dateUpdated = new Date().toLocaleDateString("en-CA");
    
    
    books.push({
        bId:bookID || bId,
        title: bookTitle || title,
        bookImage:"",
        bookReview: bookReview || bookReview,
        bookRatings: bookRating || bookRatings,
        lastUpdated: dateUpdated || lastUpdated
    });
    lastID++;
    res.redirect("/");
    }
});

app.patch("/update", (req,res) => {
    let bookID = Number(req.body.update);
    let bookTitle = req.body["book-title"];
    let bookReview = req.body["book-review"];
    let bookRating = Number(req.body["rating-value"]);
    const dateUpdated = new Date().toLocaleDateString("en-CA");
    
    const targetIndex = books.findIndex(b => b.bId === Number(bookID));

    books[targetIndex] = {
        bId:bookID || bId,
        title: bookTitle || title,
        bookImage:"",
        bookReview: bookReview || bookReview,
        bookRatings: bookRating || bookRatings,
        lastUpdated: dateUpdated || lastUpdated
    }
    res.redirect("/");
});

app.delete("/delete", (req, res) => {
    let bookID = Number(req.body.delete);
    const targetIndex = books.findIndex(b => b.bId === Number(bookID));
    books.splice(targetIndex,1);
    res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


