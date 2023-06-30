const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Jacques Cousteau",
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Explorador",
    },
    avatar: {
      type: String,
      default:
        "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
      validate: {
        validator: function () {
          return /https?:\/\/(www)?[\w._~:\/?%#[\]@!$&'()*+,;=-]+\/?/;
        },
      },
    },
    email: {
      type: String,
      require: true,
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: "Formato de correo electronico invalido",
      },
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
  },
  { versionKey: false }
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Correo o contraseña incorrecta'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Correo o contraseña incorrecta'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model("user", userSchema);
