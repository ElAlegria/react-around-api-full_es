const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (res) => {
  res.status(401).send({ message: "Error authorizacion" });
};

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

const tokenAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }
  const token = extractBearerToken(authorization);
  let payload;


  try {
    payload = jwt.verify(token, "secretToken");
    
  } catch (error) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};

module.exports = tokenAuth;
