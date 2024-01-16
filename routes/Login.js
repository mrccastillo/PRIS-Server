const router = require("express").Router();

const db = require("../db");

router.post("/login", (req, res) => {
  //need contact_number and user_password from client
  const q = "SELECT * FROM usertbl WHERE Contact_Number = ?";

  db.query(q, [req.body.Contact_Number], (err, data) => {
    console.log(req.body.Contact_Number);
    if (err) return res.status(418).json("Error: ", err);
    if (data.length < 1) return res.json("user NOT found");
    if (data[0].User_Password === req.body.User_Password)
      return res.json("Logged In!");
    else return res.status(500).json("Incorrect Password");
  });
});

router.post("/signup", (req, res) => {
  const q = "SELECT * FROM usertbl WHERE Contact_Number = ?";
  //check if a user exist
  db.query(q, [req.body.Contact_Number], (err, data) => {
    console.log(data);
    if (err) return res.status(500).json("Something went wrong");
    if (data.length) return res.json("User already exist");

    //insert user data
    const q = "INSERT INTO usertbl VALUES (?)";

    //reminder: user bcrypt to hash password
    const values = [
      req.body.First_Name,
      req.body.Last_Name,
      req.body.Username,
      req.body.Contact_Number,
      req.body.User_Password,

      req.body.Email,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User Created");
    });
  });
});

module.exports = router;
