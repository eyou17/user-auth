User Authentication App

    A simple signup and signin system built with Node.js, Express, and EJS templates. This project demonstrates basic user authentication, form handling, and server-side rendering.

Features

   => User Signup with name, username, password and password.
   => User Signin/Login with validation.
   => Password hashing for security (using bcrypt).
   => Server-side rendering with EJS.
   => Form validation and error messages.

Technologies Used

   => Node.js – JavaScript runtime.
   => Express.js – Web framework for Node.js.
   => EJS – Template engine for rendering HTML pages.
   => bcrypt – For password hashing.
   => PostgreSQL - database.
   => Bootstrap / CSS – For styling forms and pages.

Installation

  1 Clone the repository:
  
    git clone https://github.com/eyou17e/user-auth.git
    cd user-auth

  2 Install dependencies:

    npm install

  3 Run the application:

    npm start

  4 Open your browser:

    http://localhost:3000
    

Folder Structure

    user-auth/
    │
    ├─ views/          
    │   ├─ home.ejs
    │   ├─ signup.ejs
    │   
    │
    ├─ public/ 
    |   ├─ style.css
    ├─ index.js          
    └─ package.json

