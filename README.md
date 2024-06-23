# Entertainment-app-use-popcorn-backend

A. Features::

1. User Authentication
2. Sign Up
3. Log In
4. Manage Watched Movies
5. Add a new watched movie
6. Retrieve all watched movies for a user
7. Delete a watched movie from the list

B. Technologies Used::

1.Node.js 2. Express 3. MongoDB 4. Mongoose 5. dotenv

C. Project Structure::

.
├── app.js
├── index.js
├── ConnectToDatabase.js
├── .env
└── package.json

D. app.js::

This file contains the core Express server setup and the API routes for handling user and watched movie data.

E. index.js::

This file is the entry point of the application, handling the connection to MongoDB and starting the Express server.

F. ConnectToDatabase.js::

This file defines the Mongoose schemas and models for the user and watched movie data.

G. API Endpoints::

..User Routes::

G1. Get All Users
Endpoint: /users
Method: GET
Description: Retrieve all users.

G2. Sign Up
Endpoint: /signup
Method: POST
Description: Register a new user.
Request Body: {
"email": "user@example.com",
"password": "password123"
}

G3. Log In
Endpoint: /
Method: POST
Description: Authenticate a user.
Request Body:{
"email": "user@example.com",
"password": "password123"
}

..Watched Movies Routes::

G4. Get Watched Movies
Endpoint: /watched
Method: GET
Description: Retrieve all watched movies for a user.
Query Parameters:email (required)

G5. Add Watched Movie
Endpoint: /watched
Method: POST
Description: Add a new movie to the watched list.
Request Body:{
"email": "user@example.com",
"newMovie": {
"poster": "url_to_poster",
"title": "Movie Title",
"imdbID": "tt1234567",
"imdbRating": 8.2,
"userRating": 9,
"runtime": 120
}
}

G6. Delete Watched Movie
Endpoint: /watched
Method: DELETE
Description: Remove a movie from the watched list.
Request Body: {
"email": "user@example.com",
"title": "Movie Title"
}

H. Dependencies::

1. express
2. mongoose
3. cors
4. dotenv

I. License::

This project is licensed under the MIT License. See the LICENSE file for details.
