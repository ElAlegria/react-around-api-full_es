const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;

function orFailUser() {
  const error = new Error("no se ha encontrado ningun usuario");
  error.statusCode = 404;
  throw error;
}

function errorMessagesUsers(err, res) {
  if (err.name === "ValidationError") {
    res.status(400).send({ message: "Datos inválidos" });
  } else if (err.name === "CastError") {
    res.status(400).send({ message: "ID de usuario no válido" });
  } else if (err.statusCode === 404) {
    res.status(404).send({ message: "ID de tarjeta no encontrado" });
  } else {
    res.status(500).send({ message: "Ha ocurrido un error en el servidor" });
  }
}

const getUsersAll = (req, res) => {
  userModel
    .find({})
    .then((user) => res.send({ data: user }))
    .catch(() => {
      res.status(404).send({ message: "Recurso solicitado no encontrado" });
    });
};

const getUserId = (req, res, next) => {
  const { id } = req.params;

  userModel
    .findById(id)
    .orFail(orFailUser)
    .then((user) => res.send({ data: user }))
    .catch((err) => errorMessagesUsers(err, res));
};

const getUsersMe = (req, res) => {
  const { _id } = req.user;
  userModel
    .findById(_id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      userModel
        .create({
          name,
          about,
          avatar,
          email,
          password: hash,
        })
        .then((user) => {
          res.send({ data: user });
        })
    )
    .catch(() => res.send({ message: "Lo lamentamos, este usuario ya existe" }))
    .catch(next);
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  userModel
    .findByIdAndUpdate(req.user._id, { name, about })
    .orFail(orFailUser)
    .then((user) => res.send({ data: user }))
    .catch((err) => console.log(err));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  userModel
    .findByIdAndUpdate(req.user._id, { avatar })
    .orFail(orFailUser)
    .then((user) => res.send({ data: user }))
    .catch((err) => errorMessagesUsers(err, res));
};

const login = (req, res) => {
  const { email, password } = req.body;

  return userModel
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user.id },
        "secretToken",
        { expiresIn: "7d" }
      );
      res.send({ token });
    })
    .catch(() => res.send({ message: "Error en password/email" }));
};

module.exports = {
  getUsersAll,
  getUserId,
  getUsersMe,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
