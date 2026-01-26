const jwtSecret = "your_jwt_secret"; // This needs to be the same key used in JWTStrategy

const jwt = require("jsonwebtoken");
const passport = require("passport");

require("./passport"); // Local passport file

/**
 * Generates a JWT token for a user.
 * @function generateJWTToken
 * @param {Object} user - The user object to encode in the token.
 * @returns {string} - A signed JWT token valid for 7 days.
 */

const generateJWTToken = (user) =>
  jwt.sign(user, jwtSecret, {
    subject: user.Username, // Username encoded in the JWT
    expiresIn: "7d", // This specifies that the token will expire in 7 days
    algorithm: "HS256", // This is the algorithm used to “sign” or encode the values of the JWT
  });

/**
 * Authentication and Login endpoint.
 * @module auth
 * @param {object} router - The express router object.
 */

/* POST login. */
module.exports = (router) => {
  /**
   * Logs a user in and generates a JWT token.
   * * @name login
   * @path /login
   * @method POST
   * @param {string} req.body.Username - The user's username.
   * @param {string} req.body.Password - The user's password.
   * @returns {JSON} - A JSON object containing the user data and the JWT token.
   * @example
   * // Response on success:
   * {
   * "user": { "Username": "john_doe", "Email": "john@example.com", ... },
   * "token": "eyJhbGciOiJIUzI1..."
   * }
   */

  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        const token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
