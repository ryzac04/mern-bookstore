import express, { request } from "express"; 
import {PORT, mongoDBURL} from "./config.js"; 
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json()); 

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to MERN Bookstore Stack Tutorial.');
});

// Create a new book. 
app.post("/books", async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: "Please send all required fields: title, author, publish year."
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook); 
        return res.status(201).send(book); 
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Retrieve all books.
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Retrieve one book by id.
app.get("/books/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const book = await Book.findById(id);
        return res.status(200).json(book); 
    } catch (error) {
        console.log(error.message); 
        res.status(500).send({ message: error.message });
    }
})

// Update book information. 
app.put("/books/:id", async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            res.status(400).send({
                message: "Please send all required fields: title, author, publish year."
            })
        }

        const { id } = req.params; 
        const result = await Book.findByIdAndUpdate(id, req.body); 

        if (!result) {
            return res.status(404).json({ message: "Book not found." }); 
        }

        return res.status(200).send({ message: "Book updated successfully!" });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Delete a book. 
app.delete("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id); 
        if (!result) {
            return res.status(404).json({ message: "Book not found." });
        }
        return res.status(200).send({ message: "Book has been deleted." });
    } catch (error) {
        console.log(error.message); 
        return res.status(500).send({ message: error.message }); 
    }
})

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database.");
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}.`)
        });
    })
    .catch((error) => {
        console.log(error);
    });
