const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
//middleware
app.use(express.json());

//static files
app.use(express.static("./public"));

//routes
app.use("/api/v1/tasks", tasks);
// app.get("/api/v1/tasks")          -get all the tasks
// app.post("/api/v1/tasks")         -create new task
// app.get("/api/v1/tasks/:id")      -get single task
// app.patch("/api/v1/tasks:id")     -update task
// app.delete("/api/v1/tasks:id")    -delete task

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      process.env.PORT,
      console.log(`server is listining of port ${process.env.PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
