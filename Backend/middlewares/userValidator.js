const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error("User is not authorized");
        }
        console.log('decoded user from jwt :: ', decoded);
        req.user = decoded;
        next();
      });
  
      if (!token) {
        console.log('inside this');
        res.status(401);
        res.send("User is not authorized or token is missing");
      }
    }
  });

module.exports = validateToken;