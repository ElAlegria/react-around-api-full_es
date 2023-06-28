const jwt = require("jsonwebtoken");
require("dotenv").config();

const { NODE_ENV, JWT_SECRET } = process.env;
const handleAuthError = (res) => {
  res.status(401).send({ message: "Error authorizacion" });
};

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

const tokenAuth = (req, res, next) => {
  const { authorization } = req.header;

  console.log(authorization);
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (error) {
    return handleAuthError(error);
  }

  req.user = payload;

  next();
};

module.exports = tokenAuth;
