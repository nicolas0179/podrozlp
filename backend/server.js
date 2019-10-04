const express = require("express");
const cors = require("cors");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 53;

app.use(cors());
app.use(express.json());
app.use(helmet());

const uri = keys.mongoURI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .catch(err => console.log("Mongo connection error", err));

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes
const countriesRouter = require("./routes/pays");
app.use("/pays", countriesRouter);

const answersRouter = require("./routes/answers");
app.use("/answers", answersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
