const cardModel = require("../models/cards");

function orFailCards() {
  const error = new Error("Tarjeta no encontrada");
  error.statusCode = 404;
  throw error;
}

function errorMessagesCards(err, res) {
  if (err.name === "ValidationError") {
    res.status(400).send({ message: "Datos inválidos" });
  } else if (err.name === "CastError") {
    res.status(400).send({ message: "ID de tarjeta no válido" });
  } else if (err.statusCode === 404) {
    res.status(404).send({ message: "ID de tarjeta no encontrado" });
  } else {
    res.status(500).send({ message: "Ha ocurrido un error en el servidor" });
  }
}

const getCards = (req, res) => {
  cardModel
    .find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessagesCards(err, res));

};
const createCard = (req, res) => {
  const { name, link } = req.body;

  cardModel
    .create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessagesCards(err, res));

};
const removeCard = (req, res) => {
  const { id } = req.params;

  cardModel
    .findByIdAndRemove(id)
    .orFail(orFailCards)
    .then((user) => res.send({ data: user }))
    .catch((err) => errorMessagesCards(err, res));
};

const likeCard = (req, res) => {
  cardModel
    .findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } }, // agrega _id al array si aún no está ahí
      { new: true }
    )
    .orFail(orFailCards)
    .populate("likes")
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessagesCards(err, res));
};
const dislikeCard = (req, res) => {
  cardModel
    .findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } }, // elimina _id del array
      { new: true }
    )
    .orFail(orFailCards)
    .populate("likes")
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessagesCards(err, res));
};

module.exports = {
  getCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
};
