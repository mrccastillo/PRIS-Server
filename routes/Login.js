const router = require("express").Router();

const db = require("../db");

router.post("/login", (req, res) => {
  const q = "SELECT * FROM usertbl WHERE username = ? AND password = ?";

  db.query(q, [req.body.username, req.body.password], (err, data) => {
    if (err) return res.status(500).json("Incorrect Credentials");

    return res.status(200).json("logged in");
  });
});

router.post("/signup", (req, res) => {
  const q = "SELECT * FROM usertbl WHERE username = ?";
  //check if a user exist
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json("Something went wrong");
    if (data.length) return res.json("User already exist");

    //insert user data
    const q = "INSERT INTO usertbl (`username`, `password`) VALUES (?)";

    //reminder: user bcrypt to hash password
    const values = [req.body.username, req.body.password];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User Created");
    });
  });
});
