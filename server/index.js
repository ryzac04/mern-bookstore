import express, { request } from "express"; 
import {PORT, mongoDBURL} from "./config.js"; 
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors"; 

const app = express();

// Middleware for handling CORS Policy
// Option 1: Allow all origins with default cors(*)
app.use(cors()); 

// Option 2: Allow custom origins
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"], 
// }))

// Middleware for parsing request body
app.use(express.json()); 

// Routes middleware
app.use("/books", booksRoute); 

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to MERN Bookstore Stack Tutorial.');
});

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
