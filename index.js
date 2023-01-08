const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();

app.use(morgan('common'));

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: 'John',
    favoritemovies: [],
  },
  {
    id: 2,
    name: 'Adam',
    favoritemovies: ['Interstellar'],
  },
];

let topMovies = [
  {
    'Title': 'Forrest Gump',
    'Description': 'The presidencies of Kennedy and Johnson, the Vietnam War the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
    'Genre': {
      'Name': 'Drama',
      'Description': 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
    },
    'Director': {
      'Name': 'Robert Zemeckis',
      'Bio': "A whiz-kid with special effects, Robert is from the Spielberg camp of film-making (Steven Spielberg produced many of his films). Usually working with writing partner Bob Gale, Robert's earlier films show he has a talent for zany comedy (Romancing the Stone (1984), 1941 (1979)) and special effect vehicles (Who Framed Roger Rabbit (1988) and Back to the Future (1985)). His later films have become more serious, with the hugely successful Tom Hanks vehicle Forrest Gump (1994) and the Jodie Foster film Contact (1997), both critically acclaimed movies. Again, these films incorporate stunning effects. Robert has proved he can work a serious story around great effects.",
      'Birth':1952.0 
  },
  'ImageURL': 'https://www.imdb.com/title/tt0109830/mediaviewer/rm1954748672/?ref_=tt_ov_i',
  'Featured': false
},
  {
    'Title': 'Interstellar',
    'Description': "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    'Genre': {
      'Name': 'Sci-Fi',
      'Description': 'Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel, time travel, or other technologies.'
    },
    'Director': {
      'Name': 'Christopher Nolan',
      'Bio': "Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.",
      'Birth':1970.0 
  },
  'ImageURL': 'https://www.imdb.com/title/tt0816692/mediaviewer/rm4043724800/?ref_=tt_ov_i',
  'Featured': false
},
  {
    'Title': 'The Shawshank Redemption',
    'Description': "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    'Genre': {
      'Name': 'Drama',
      'Description': 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
    },
    'Director': {
      'Name': 'Frank Darabont',
      'Bio': "Three-time Oscar nominee Frank Darabont was born in a refugee camp in 1959 in Montbeliard, France, the son of Hungarian parents who had fled Budapest during the failed 1956 Hungarian revolution. Darabont is one of only six filmmakers in history with the unique distinction of having his first two feature films receive nominations for the Best Picture Academy Award: 1994's The Shawshank Redemption (1994) (with a total of seven nominations) and 1999's The Green Mile (1999) (four nominations). Darabont himself collected Oscar nominations for Best Adapted Screenplay for each film (both based on works by Stephen King), as well as nominations for both films from the Director's Guild of America, and a nomination from the Writers Guild of America for The Shawshank Redemption (1994). He won the Humanitas Prize, the PEN Center USA West Award, and the Scriptor Award for his screenplay of 'The Shawshank Redemption'. For 'The Green Mile', he won the Broadcast Film Critics prize for his screenplay adaptation, and two People's Choice Awards in the Best Dramatic Film and Best Picture categories. The Majestic (2001), starring Jim Carrey, was released in December 2001. He executive-produced the thriller, Collateral (2004), for DreamWorks, with Michael Mann directing and Tom Cruise starring. Future produced-by projects include 'Way of the Rat' at DreamWorks with Chuck Russell adapting and directing the CrossGen comic book series and 'Back Roads', a Tawni O'Dell novel, also at DreamWorks, with Todd Field attached to direct. Darabont and his production company, 'Darkwoods Productions', have an overall deal with Paramount Pictures.",
      'Birth':1959.0 
  },
  'ImageURL': 'https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i',
  'Featured': true
},
];

// Create: Post requests
app.post('/users', (req, res) => {
  const newUser = req.body;
  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send('New user requires name');
  }
});

app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
  let user = users.find(user => user.id == id);
  if (user) {
    user.favoritemovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id} array`);
  } else {
    res.status(400).send('User not found');
  }
});

// Update: Put requests
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updateUser = req.body;

  let user = users.find(user => user.id == id);
  if (user) {
    user.name = updateUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('User not found');
  }
});

// Delete: Delete requests
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
  let user = users.find(user => user.id == id);
  if (user) {
    user.favoritemovies = user.favoritemovies.filter(title => title !== movieTitle) ;
    res.status(200).send(`${movieTitle} has been removed from user ${id} array`);
  } else {
    res.status(400).send('User not found');
  }
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  let user = users.find(user => user.id == id);
  if (user) {
    users = users.filter(user => user.id != id);
    res.status(200).send(`User ${id} has been deleted`);
  } else {
    res.status(400).send('User not found');
  }
});

// Read: GET requests
app.get('/movies', (req, res) => {
  res.status(200).json(topMovies);
});

app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = topMovies.find(movie => movie.Title === title);
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('Movie not found');
  }
});

app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = topMovies.find( movie => movie.Genre.Name === genreName).Genre;
  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('Genre not found');
  }
});

app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = topMovies.find( movie => movie.Director.Name === directorName).Director;
  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('Director not found');
  }
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
