const router = require("express").Router();

const db = require("../db");

router.get("/:railway/:from", (req, res) => {
  const { railway, from } = req.params;

  const q = `SELECT * FROM ${railway} WHERE Station_ID = ${from}`;

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

module.exports = router;
