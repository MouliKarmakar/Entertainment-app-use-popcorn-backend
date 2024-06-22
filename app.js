const express = require("express");
const cors = require("cors");
const userModule = require("./ConnectToDatabase"); // Correctly require the user model

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/users", async (req, res) => {
  try {
    const users = await userModule.find(); // Await the query
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
});

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModule.findOne({ email }); // Await the query
    if (user) {
      if (password === user.password) {
        res.status(200).json("Redirecting to the homepage");
      } else {
        res.status(401).json("Invalid password");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModule.findOne({ email }); // Await the query

    if (user) {
      return res.status(400).json("User already exists");
    }
    // Create a new user
    const newUser = new userModule({
      email,
      password,
    });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.get("/watched", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await userModule.findOne({ email }).select("watched");

    if (user) {
      res.status(200).json(user.watched); // Return watched array directly
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/watched", async (req, res) => {
  const { email, newMovie } = req.body;

  try {
    // Find the user by email
    const user = await userModule.findOne({ email });

    if (user) {
      // Check if the movie title already exists in the watched list
      const movieExists = user.watched.some(
        (movie) => movie.title === newMovie.title
      );

      if (movieExists) {
        // Movie with the same title already exists
        return res
          .status(400)
          .json({ message: "Movie already exists in the watched list" });
      } else {
        // Push the new movie into the 'watched' array
        user.watched.push(newMovie);

        // Save the updated user document
        await user.save();

        // Return success response with updated watched movies array
        return res.status(200).json({
          message: "Movie added successfully",
          data: user.watched,
        });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "An error occurred" });
  }
});

app.delete("/watched", async (req, res) => {
  const { email, title } = req.body;

  try {
    // Find the user by email
    const user = await userModule.findOne({ email });

    if (user) {
      // Find the index of the movie with the specified title in the watched array
      const index = user.watched.findIndex((movie) => movie.title === title);

      if (index !== -1) {
        // Remove the movie from the watched array
        user.watched.splice(index, 1);

        // Save the updated user document
        await user.save();

        // Return success response with updated watched movies array
        res.status(200).send({
          message: "Movie deleted successfully",
          data: user.watched,
        });
      } else {
        // Movie with the specified title not found in the watched list
        res
          .status(404)
          .send({ message: "Movie not found in the watched list" });
      }
    } else {
      // User not found
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "An error occurred" });
  }
});

module.exports = app;
