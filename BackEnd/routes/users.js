const routerUsers = require("express").Router();
const {
  getUsersAll,
  getUserId,
  updateUser,
  updateAvatar,
} = require("../controllers/user");

routerUsers.get("/", getUsersAll);
routerUsers.get("/:id", getUserId);
routerUsers.patch("/me", updateUser);
routerUsers.patch("/me/avatar", updateAvatar);

module.exports = routerUsers;
