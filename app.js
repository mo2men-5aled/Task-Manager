const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
//middleware
app.use(cors());
app.use(express.json());
app.use(errorHandler);

//static files
app.use(express.static("./public"));

//routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listining of port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
