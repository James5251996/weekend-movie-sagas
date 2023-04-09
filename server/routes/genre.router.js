const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  // My database text to select the info I want from the database
  const sqlText = `SELECT movies.title, genres.name, movies.description, movies.poster FROM movies
  JOIN movies_genres ON movies.id = movies_genres.movie_id
  JOIN genres ON movies_genres.genre_id = genres.id
  WHERE movies.id = $1
  GROUP BY movies.title, genres.name, movies.description, movies.poster;`;

  // this query will make the reuest in the databas to get the data based on the movie id entered.
  pool.query(sqlText, [req.params.id])
  .then((results) => {
    res.send(results.rows)
  }).catch((error) => {
    console.log('error in genre.router.get', error)
    res.sendStatus(500)
  });
});

module.exports = router;