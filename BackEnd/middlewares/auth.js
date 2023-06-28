const jwt = require("jsonwebtoken");
const {JWT_SECRET} = process.env

const handleAuthError = (res) => {
  res.status(401).send({ message: "Error authorizacion" });
};

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

const tokenAuth = (req, res, next) => {
  const { authorization } = req.header;

  if (!authorization || !authorization.startWith("bearer")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET : "dev-secret");
  } catch (error) {
    return handleAuthError(error);
  }

  req.user = payload;

  next();
};


module.exports = tokenAuth
