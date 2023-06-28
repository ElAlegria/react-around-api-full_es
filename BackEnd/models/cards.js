const mongoose = require("mongoose");

const cardsSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
  },
  link: {
    type: String,
    require: true,
    validate: {
      validator: function (v) {
        return /https?:\/\/(www)?[\w._~:\/?%#[\]@!$&'()*+,;=-]+\/?/.test(v);
      },
      message: "Lo sentimos esta no una URL correcta",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default:[]
    },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("cards", cardsSchema);
