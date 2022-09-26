const mongoose = require("mongoose");
const connectionString =
  "mongodb+srv://momen:mo2men@cluster0.gtplyfa.mongodb.net/TASK_MANAGER?retryWrites=true&w=majority";

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to the Database"))
  .catch((err) => console.log(err));
