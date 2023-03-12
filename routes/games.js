const express = require("express");
const router = express.Router();
const GameController = require("../controllers/gameController.js")

router.get("/", GameController.findGames);
router.get("/:id", GameController.findById);
router.post("/", GameController.createGame);
// router.put("/:id", GameController.updateGame);
router.delete("/:id", GameController.deleteGame);
module.exports = router;