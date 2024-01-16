const router = require("express").Router();

const db = require("../db");

//edit username
router.patch("/login", (req, res) => {
  //need contact_number and user_password from client
  const q = "SELECT * FROM usertbl WHERE Contact_Number = ?";

  //   db.query(q, [req.body.Contact_Number], (err, data) => {
  //     console.log(req.body.Contact_Number);
  //     if (err) return res.status(418).json("Error: ", err);
  //     if (data.length < 1) return res.json("user NOT found");
  //     if (data[0].User_Password === req.body.User_Password)
  //       return res.json("Logged In!");
  //     else return res.status(500).json("Incorrect Password");
  //   });
});

//edit password
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

module.exports = router;
