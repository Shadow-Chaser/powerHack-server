const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const userHandler = require('./handlers/userHandler');
const billHandler = require('./handlers/billHandler')

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("database connection successful!"))
    .catch((err) => console.log(err));

app.use("/", userHandler);
app.use("/", billHandler);


const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}


app.listen(process.env.PORT, () => {
    console.log(`app listening to port ${process.env.PORT}`);
});