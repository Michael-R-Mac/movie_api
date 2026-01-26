const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * Schema for the Movie model.
 * @typedef {Object} Movie
 * @property {string} Title - The title of the movie (Required).
 * @property {string} Description - A short synopsis of the movie (Required).
 * @property {Object} Genre - Information about the movie's genre.
 * @property {string} Genre.Name - The name of the genre.
 * @property {string} Genre.Description - The description of the genre.
 * @property {Object} Director - Information about the movie's director.
 * @property {string} Director.Name - The name of the director.
 * @property {string} Director.Bio - The biography of the director.
 * @property {string[]} Actors - A list of actors in the movie.
 * @property {string} ImagePath - A URL or path to the movie's poster image.
 * @property {boolean} Featured - Whether the movie is featured on the home page.
 */

const movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

/**
 * Schema for the User model.
 * @typedef {Object} User
 * @property {string} Username - Unique identifier for the user (Required).
 * @property {string} Password - Hashed password for the user (Required).
 * @property {string} Email - User's email address (Required).
 * @property {Date} Birthday - User's date of birth.
 * @property {mongoose.Schema.Types.ObjectId[]} FavoriteMovies - List of IDs referencing the Movie model.
 */

const userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

/**
 * Hashes a plain-text password using bcrypt.
 * @function hashPassword
 * @memberof User
 * @param {string} password - The plain-text password to be hashed.
 * @returns {string} The hashed password.
 */

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * Validates a plain-text password against the user's stored hashed password.
 * @function validatePassword
 * @memberof User
 * @instance
 * @param {string} password - The plain-text password to check.
 * @returns {boolean} True if the password matches, false otherwise.
 */

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

const Movie = mongoose.model("Movie", movieSchema);
const User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
