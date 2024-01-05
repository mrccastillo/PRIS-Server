const router = require("express").Router();

const db = require("../db");

router.get("/:railway/:to/:from", (req, res) => {
  const { railway, from, to } = req.params;
  const q = `SELECT ${to} FROM ${railway} WHERE Station_ID = ${from}`;

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

module.exports = router;
