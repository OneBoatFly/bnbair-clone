// importing jwt package and User model
// creating user authentication middleware in this file

const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config'); // this comes from /config/index.js file
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig; // this is what got defined in the above idx file

const setTokenCookie = (res, user) => {
  // jwt.sign(payload, secretOrPrivateKey, [options, callback])
  const token = jwt.sign(
    { data: user.toSafeObject() }, // the id, username, email of this user
    secret, // set up in my .env file
    { expiresIn: parseInt(expiresIn, 10) }, // set up in my .env file
  );

  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('token', token, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && 'Lax',
  });

  return token;
};

const restoreUser = (req, res, next) => {
  const { token } = req.cookies;
  req.user = null;

  // jwt.verify(token, secretOrPublicKey, [options, callback])
  // If a callback is supplied, function acts asynchronously. The callback is called with the
  // decoded payload if the signature is valid and optional expiration, audience, or issuer
  // are valid. If not, it will be called with the error.
  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next(); // for security
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

const requireAuth = (req, _res, next) => {
  // in restoreUser, if jwt verified, there will be a user key set on req which is the found user
  // then, just go to the next middleware (authenticated user)
  if (req.user) return next();

  const err = new Error('Unauthorized');
  err.title = 'Unauthorized';
  err.errors = ['Unauthorized'];
  err.status = 401;
  return next(err);
};

module.exports = {
  setTokenCookie,
  restoreUser,
  requireAuth,
};
