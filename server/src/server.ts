import bodyParser from "body-parser";
import express from "express";

import connectDB from "../config/database";
import user from "./routes/api/user";
import todo from './routes/api/todotask';
let cors = require('cors')
let app = express()


app.use(cors())

// Connect to MongoDB
connectDB().then(() => { console.log('Databases connnnnnnnnnnnnnnnnencted') });


// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public

app.get("/", (req, res) => {
  res.send("API Running ");
});

app.use("/api/users", user);
app.use("/api/todos", todo);


const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
