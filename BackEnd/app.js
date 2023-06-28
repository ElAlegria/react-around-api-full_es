const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3000 } = process.env;
const userCards = require("./routes/cards");
const userUsers = require("./routes/users");
const app = express();
const { login, createUser } = require("./controllers/user");
const tokenAuth = require("./middlewares/auth");


const errorHandle = (err, req, res) => {
  if (err.name === "CastError") {
    return res
      .status(400)
      .send({
        message:
          "Se pasaron datos inválidos a los métodos para crear un usuario/tarjeta o actualizar el avatar/perfil de un usuario.",
      });
  }
  if (err.name === "DocumentNotFoundError") {
    return res
      .status(404)
      .send({
        message:
          "No existe un usuario con el id solicitado o la solicitud se envió a una dirección inexistente;",
      });
  }
  if (err.code === 11000) {
    return res
      .status(409)
      .send({
        message:
          "Al registrarse, se especificó un correo electrónico que ya existe en el servidor",
      });
  }
  console.log(err);
  res.status(500).send({ message: "Se ha producido un error en el servidor" });
};

mongoose
  .connect("mongodb://127.0.0.1:27017/aroundb")
  .then(() => console.log("conexion exitosa mi apa"))
  .catch((err) => console.log("error:", err));

app.get("/", (req, res) => {
  res.status(500).send({ message: "Recurso solicitado no encontrado" });
});

app.use(express.json());

app.post("/signUp", createUser);
app.post("/signIn", login);

app.use(tokenAuth);
app.use("/users", userUsers);
app.use("/cards", userCards);

app.use(errorHandle);

app.listen(PORT, () => {
  console.log("Enlace a server");
});
