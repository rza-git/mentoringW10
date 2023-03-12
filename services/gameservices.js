const GameRepository = require("../repositories/gamerepository.js")

class GameService {

    static findGames = async (next) => {
        try {
            const data = await GameRepository.findGames(next);
            return data;
        } catch(err) {
            next(err)
        }
    }

    static findById = async (id) => {
        return await GameRepository.findById(id);
    }

    static createGame = async (params, next) => {
        try {
            return GameRepository.createGame(params, next);
        } catch(err) {
            next(err);
        }
    }

    static deleteGame = async (id, next) => {
        try {
            return GameRepository.deleteGame(id, next);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = GameService;