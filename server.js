const connection = require("./db-config");
const express = require("express");
const { connect } = require("./db-config");
const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome sur ma page");
});

//Route pour afficher tous les jeux
app.get("/api/games", (req, res) => {
  connection.query("SELECT * from games", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

//Route pour afficher le jeu sélectionné
app.get("/api/games/:id", (req, res) => {
  connection.query(
    "SELECT * from games WHERE id=?",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

//Route pour poster un nouveau jeu
app.post("/api/games", (req, res) => {
  const { title, cover, plateform, year, rate, description } = req.body;
  connection.query(
    "INSERT INTO games (title, cover, plateform, year, rate, description) VALUES (?, ?, ?, ?, ?, ?)",
    [title, cover, plateform, year, rate, description],
    (err, result) => {
      if (err) {
        res.status(500).send("Error saving new user");
      } else {
        res.status(201).send("Game correctly added");
      }
    }
  );
});

//Route pour supprimer un jeu
app.delete("/api/games/:id", (req, res) => {
  const gameId = req.params.id;
  connection.query(
    "DELETE FROM games WHERE id = ?",
    [gameId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting game");
      } else {
        res.status(200).send("Game successfully deleted");
      }
    }
  );
});
