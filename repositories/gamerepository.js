const Game = require("../models/game.js")

class GameRepository {

    static findGames = async (next) => {

        try {
            const data = await Game.getGames(next);
            return data;
        } catch(err) {
            next(err);
        }
    }

    static findById = async (id) => {
        
        return await Game.findById(id);
    }

    static createGame = async (params, next) => {
        try {
            return Game.createGame(params, next);
        } catch(err) {
            next(err);
        }
    }

    static deleteGame = async (id, next) => {
        try {
            return Game.deleteGame(id, next)
        } catch(err) {
            next(err);
        }
    }
}

module.exports = GameRepository;