//add transaction to db
const router = require("express").Router();

const db = require("../db");

router.post("/", (req, res) => {
  const q =
    "INSERT INTO transactiontbl (UserID, TransactDate, Fname, Lname, RailwayID, OriginStation, To_Station, ContactNo, Fare, DiscountType, PaymentMethod) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.UserID,
    req.body.TransactDate,
    req.body.Fname,
    req.body.Lname,
    req.body.RailwayID,
    req.body.OriginStation,
    req.body.To_Station,
    req.body.ContactNo,
    req.body.Fare,
    req.body.DiscountType,
    req.body.PaymentMethod,
  ];
  db.query(q, values, (err, data) => {
    console.log(data);
    if (err) return res.json("Something went wrong");
    return res.json(data);
  });
});

router.get("/:UserID", (req, res) => {
  const { UserID } = req.params;
  console.log(UserID);

  const q = `
    SELECT * 
    FROM transactiontbl 
    INNER JOIN usertbl ON transactiontbl.UserID = usertbl.UserID
    WHERE transactiontbl.UserID = ?`;

  db.query(q, [UserID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Something went wrong");
    }
    return res.json(data);
  });
});

module.exports = router;
