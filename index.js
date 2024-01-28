const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

//routes
const TrainFares = require("./routes/TrainFares");
const Login = require("./routes/Login");
const UserRoutes = require("./routes/UserRoutes");
const Transaction = require("./routes/Transaction");

//middlewres
app.use(express.json());
app.use(cors());

//api
app.use("/api", Login);
app.use("/api", UserRoutes);
app.use("/api/transaction", Transaction);
app.use("/api/trainfares", TrainFares);

app.listen(port, () => {
  console.log("the server is running:", port);
});
