const { Router } = require("express");

const user = require("./user.js");

const router = Router();

router.get("/test", (req, res) => {
  res.send({ data: "Service Success Running!!" });
});

router.use("/user", user);

module.exports = router;
