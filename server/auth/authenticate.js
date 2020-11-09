const jwt = require('jsonwebtoken');

const config = require('config');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, config.get('JWT_SECRET'), (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: 'you are not autherized.  the token is not valid.',
        });
      } else {
        req.user = decodedToken;

        // have to get accessType out of decodedToken
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'you shall not pass!' });
  }
};
