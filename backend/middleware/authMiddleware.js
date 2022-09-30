const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/');
      } else {
        next();
      }
    });
  } else {
    res.redirect('/');
  }
};

module.exports = { requireAuth };