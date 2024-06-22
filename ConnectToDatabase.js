const mongoose = require("mongoose");

const WatchedMovieSchema = new mongoose.Schema({
  poster: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imdbID: {
    type: String,
    default: "",
  },
  imdbRating: {
    type: Number,
    required: true,
  },
  userRating: {
    type: Number,
    required: true,
  },
  runtime: {
    type: Number,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  watched: [WatchedMovieSchema],
});

module.exports = mongoose.model("PopcornUser", userSchema);
