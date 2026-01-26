const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const Models = require("./models.js");

const Users = Models.User;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

/**
 * Configures the LocalStrategy for Passport.
 * This strategy handles basic username/password login.
 * @function
 * @name useLocalStrategy
 * @param {string} usernameField - The field name for the username (Username).
 * @param {string} passwordField - The field name for the password (Password).
 * @callback - Verified callback that returns the user object if credentials are valid.
 */

passport.use(
  new LocalStrategy(
    {
      usernameField: "Username",
      passwordField: "Password",
    },
    (username, password, callback) => {
      console.log(`${username}  ${password}`);
      Users.findOne({ Username: username }, (error, user) => {
        if (error) {
          console.log(error);
          return callback(error);
        }

        if (!user) {
          console.log("incorrect username");
          return callback(null, false, { message: "Incorrect username." });
        }

        if (!user.validatePassword(password)) {
          console.log("incorrect password");
          return callback(null, false, { message: "Incorrect password." });
        }

        console.log("finished");
        return callback(null, user);
      });
    },
  ),
);

/**
 * Configures the JWTStrategy for Passport.
 * This strategy handles securing endpoints by requiring a valid JSON Web Token.
 * @function
 * @name useJWTStrategy
 * @param {Object} jwtFromRequest - Instructions for extracting the JWT from the request header (Bearer Token).
 * @param {string} secretOrKey - The secret key used to verify the signature of the JWT.
 * @callback - Verified callback that returns the user if the JWT payload is valid.
 */

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    (jwtPayload, callback) =>
      Users.findById(jwtPayload._id)
        .then((user) => callback(null, user))
        .catch((error) => callback(error)),
  ),
);
