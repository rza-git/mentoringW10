const GameService = require("../services/gameservices.js")

class GameController {

    // CLASS DAN OBJECT
    // static ==> METHOD MILIK CLASS
    // ==> BUKAN method milik object
    static findGames = async (req, res, next) => {

        try {
            const data = await GameService.findGames(next);
            res.status(200).json(data);
        } catch(err) {
            next(err);
        }

    }

    static findById = async (req, res, next) => {   

        try {
            const {id} = req.params;
            const {err, data} = await GameService.findById(id);
            if(err) {
                throw err;
            } else {
                res.status(200).json(data);
            }
        } catch(err) {
            next(err);
        }

    }

    static createGame = async (req, res, next) => {
        try {
            const data = await GameService.createGame(req.body, next)

            res.status(201).json(data);
        } catch(err) {
            next(err);
        }
    }

    static deleteGame = async(req, res, next) => {
        try {
            const {id} = req.params;

            const data = await GameService.deleteGame(id, next);

            if(data) {
                res.status(200).json({
                    message: "Deleted successfully",
                    data
                })
            } else {
                next({name: "ErrorNotFound"})
            }
        } catch(err) {
            next(err);
        }
    }
}

module.exports = GameController;