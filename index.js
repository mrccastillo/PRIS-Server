const express = require("express");
const app = express();
const port = 8080;

//routes
const TrainFares = require("./routes/TrainFares");

//middlewres
app.use(express.json());

//api
app.use("/api/trainfares", TrainFares);

app.listen(port, () => {
  console.log("the server is running");
});
