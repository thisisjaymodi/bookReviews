import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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



app.get("/", (req,res) => {
    res.render("index.ejs", {books:books});
});

app.get("/edit", (req,res) => {
    res.render("edit.ejs");
});

app.get("/view", (req,res) => {
    res.render("view.ejs");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});






// const bookReview = {
//     title,
//     bookImage, /* from API */
//     reviewNotes,
//     ratings,
//     dateUpdated /* Sys generated */
// }