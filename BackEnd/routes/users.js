const routerUsers = require("express").Router();
const {
  getUsersAll,
  getUserId,
  updateUser,
  updateAvatar,
  getUsersMe
} = require("../controllers/user");

routerUsers.get("/", getUsersAll);
routerUsers.get("/:id", getUserId);
routerUsers.get("/me", getUsersMe)
routerUsers.patch("/me", updateUser);
routerUsers.patch("/me/avatar", updateAvatar);

module.exports = routerUsers;
