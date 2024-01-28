const router = require("express").Router();

const db = require("../db");

router.post("/login", (req, res) => {
  //need contact_number and user_password from client
  const q = "SELECT * FROM usertbl WHERE ContactNo = ?";

  db.query(q, [req.body.Contact_Number], (err, data) => {
    console.log(req.body.Contact_Number);
    if (err) return res.status(418).json("Error: ", err);
    if (data.length < 1) return res.json("user NOT found");
    if (data[0].UserPassword === req.body.User_Password) {
      db.query(
        "SELECT * FROM usertbl WHERE ContactNo = ?",
        [req.body.Contact_Number],
        (err, data) => {
          if (data) res.json([data, "Logged In!"]);
          if (err) res.json(err);
        }
      );
    } else return res.status(500).json("Incorrect Password");
  });
});

router.post("/signup", (req, res) => {
  const q = "SELECT * FROM usertbl WHERE ContactNo = ?";
  //check if a user exist
  db.query(q, [req.body.Contact_Number], (err, data) => {
    console.log(data);
    if (err) return res.status(500).json("Something went wrong");
    if (data.length) return res.json("User already exist");

    //insert user data
    const q =
      "INSERT INTO usertbl (FName, LName, Username, ContactNo, Email, UserPassword) VALUES (?, ?, ?, ?, ?, ?)";

    const values = [
      req.body.First_Name,
      req.body.Last_Name,
      req.body.Username,
      req.body.Contact_Number,
      req.body.Email,
      req.body.User_Password,
    ];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data) {
        db.query(
          "SELECT * FROM usertbl WHERE ContactNo = ?",
          [req.body.Contact_Number],
          (err, data) => {
            if (err) res.json("error", err);
            if (data) res.json([data, "User Created"]);
          }
        );
      }
    });
  });
});

module.exports = router;
