const routerUsers = require("express").Router();
const {
  getUsersAll,
  getUserId,
  updateUser,
  updateAvatar,
  getUserInfo
} = require("../controllers/user");

routerUsers.get("/", getUsersAll);
routerUsers.get("/me", getUserInfo)
routerUsers.get("/:id", getUserId);
routerUsers.patch("/me", updateUser);
routerUsers.patch("/me/avatar", updateAvatar);

module.exports = routerUsers;
