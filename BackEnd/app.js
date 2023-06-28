const express = require("express")  ;
const mongoose = require("mongoose");
const { PORT = 3000 } = process.env;
const userCards = require("./routes/cards");
const userUsers = require("./routes/users");
const app = express();
const { login, createUser } = require("./controllers/user");
const tokenAuth = require("./middlewares/auth");

mongoose
  .connect("mongodb://127.0.0.1:27017/aroundb")
  .then(() => console.log("conexion exitosa mi apa"))
  .catch((err) => console.log("error:", err));

app.get("/", (req, res) => {
  res.status(500).send({ message: "Recurso solicitado no encontrado" });
});

app.use(express.json())

app.post('/signUp',createUser)
app.post('/signIn',login)


app.use("/users",tokenAuth,userUsers);
app.use("/cards",tokenAuth,userCards);



app.listen(PORT, () => {
  console.log("Enlace a server");
});
