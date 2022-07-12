const { Router } = require("express");

const router = Router();

router.post("/", (req, res) => {
  res.json({ message: "Hi User" });
});

module.exports.handler = router;
