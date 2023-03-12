const pool = require("../config/config.js")

class Game {

    static getGames = async (next) => {
        // callback (err, result)
        const findQuery = `
            SELECT 
                *
            FROM games;
        `
        // ASYNCHRONOUS
        try {
            const data = await pool.query(findQuery)

            return data.rows;
        } catch(err) {
            next(err);
        }

    }

    static findById = async (id, next) => {

        const findQuery = `
            SELECT 
                games.id AS id,
                games.title AS title,
                games.year AS year,
                games.developer AS developer,
                ARRAY_AGG(genres.name) AS genres,
                games.image_url AS image_url
            FROM games
                INNER JOIN game_genres
                    ON games.id = game_genres.game_id
                INNER JOIN genres
                    ON genres.id = game_genres.genre_id
            WHERE games.id = $1
            GROUP BY games.id
        `;

        try {
            const data = await pool.query(findQuery, [id])

            if(data.rows.length === 0) {
                throw {name: "ErrorNotFound"}
            } else {
                return {err: null, data: data.rows[0]};
            }

        } catch(err) {
            return {err, data: null}
        }
    }

    static createGame = async (params, next) => {
        try {
            const {title, developer, year, genres} = params;
            const insertQuery = `
                INSERT INTO games (title, developer, year)
                    VALUES
                        ($1, $2, $3)
                RETURNING *
            `

            const game = await pool.query(insertQuery, [title, developer, year])

            let insertGenres = `
                INSERT INTO game_genres (game_id, genre_id)
                    VALUES
            `
            for(let i = 0; i < genres.length; i++) {
                const genre_id = genres[i];
                let temp = ''
                if(i === genres.length - 1) {
                    temp += `($1, ${genre_id});`
                } else {
                    temp += `($1, ${genre_id}),`
                }
                insertGenres += temp;
            }

            
            // INSERT GENRES
            if(game) {

                await pool.query(insertGenres, [game.rows[0].id])
                return game.rows[0];
            } else {
                next({name: "ErrorNotFound"})
            }
        } catch(err) {
            next(err);
        }
    }

    static deleteGame = async (id, next) => {
        try {
            const deleteQuery = `
                DELETE FROM games
                WHERE id = $1
                RETURNING *
            `

            const data = await pool.query(deleteQuery, [id]);

            return data.rows[0]
        } catch(err) {
            next(err);
        }
    }

    
}

module.exports = Game;