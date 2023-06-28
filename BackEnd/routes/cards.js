const routerCards = require("express").Router();

const {
  getCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
} = require("../controllers/card");

routerCards.get("/", getCards);
routerCards.post("/", createCard);
routerCards.delete("/:id", removeCard);
routerCards.put("/:id/likeCard", likeCard);
routerCards.delete("/:id/dislikeCard", dislikeCard);
module.exports = routerCards;
