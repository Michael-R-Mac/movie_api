const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const topMovies = [
  {
    title: 'Forrest Gump',
    director: 'Robert Zemeckis',
  },
  {
    title: 'Interstellar',
    director: 'Christopher Nolan',
  },
  {
    title: 'The Shawshank Redemption',
    director: 'Frank Darabont',
  },
  {
    title: 'Gladiator',
    director: 'Ridley Scott',
  },
  {
    title: 'Modern Times',
    director: 'Charles Chaplin',
  },
  {
    title: 'The Great Dictator',
    director: 'Charles Chaplin',
  },
  {
    title: 'Joker',
    director: 'Todd Phillips',
  },
  {
    title: 'The Boat',
    director: 'Wolfgang Petersen',
  },
  {
    title: 'Amélie',
    director: 'Jean-Pierre Jeunet',
  },
  {
    title: 'L.A. Confidential',
    director: 'Curtis Hanson',
  },
  {
    title: 'Ben-Hur',
    director: 'William Wyler',
  },
];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my movie API!');
});

app.use(express.static('public'));

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
