const router = require("express").Router();

const db = require("../db");

//edit pass
router.patch("/user/editpass/:userID", (req, res) => {
  //need contact_number and user_password from client
  const { userID } = req.params;
  const q = `SELECT * FROM usertbl WHERE UserID = ${userID}`;
  db.query(q, (err, data) => {
    if (err) return res.json("Error");

    db.query(
      `UPDATE usertbl SET UserPassword = ? WHERE ContactNo = ?`,
      [req.body.updatePass, req.body.Contact_Number],
      (err, data) => {
        if (err) return res.status(418).json("Error: ", err);
        if (data) return res.status(200).json("You ");
      }
    );
  });
});

module.exports = router;
