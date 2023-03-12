const express = require("express");
const router = express.Router();
const gameRouter = require("./games.js")

router.use("/games", gameRouter);

module.exports = router;