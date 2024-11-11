const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

// Sample endpoint
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM User", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Retrieve bookmarks
app.get("/api/bookmarks/:user_id", (req, res) => {
  const { user_id } = req.params;

  const getBookmarksQuery = `
    SELECT b.bookmark_id, b.article_id, a.name AS article_name, a.summary
    FROM Bookmarks b
    JOIN Articles a ON b.article_id = a.article_id
    WHERE b.user_id = ?
  `;
  
  db.query(getBookmarksQuery, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(results);
  });
});

// Bookmark Route
app.post("/api/bookmark", (req, res) => {
  const { user_id, article_id } = req.body;

  // Check if the bookmark already exists
  const checkBookmarkQuery = "SELECT * FROM Bookmarks WHERE user_id = ? AND article_id = ?";
  db.query(checkBookmarkQuery, [user_id, article_id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: "Bookmark already exists" });
    }

    // Insert the new bookmark
    const bookmarkQuery = "INSERT INTO Bookmarks (user_id, article_id) VALUES (?, ?)";
    db.query(bookmarkQuery, [user_id, article_id], (err, bookmarkResult) => {
      if (err) {
        return res.status(500).json({ message: "Error saving bookmark", error: err });
      }
      res.status(201).json({ message: "Bookmark added successfully", bookmarkId: bookmarkResult.insertId });
    });
  });
});

// Register Route
app.post("/api/register", (req, res) => {
  const { first_name, last_name, email, phone_number, username, password } = req.body;

  // Check if user already exists
  db.query("SELECT * FROM Login WHERE username = ?", [username], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert user data into the User table
    const userQuery = "INSERT INTO User (first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?)";
    db.query(userQuery, [first_name, last_name, email, phone_number], (err, userResult) => {
      if (err) {
        return res.status(500).json({ message: "Error saving user details", error: err });
      }

      const user_id = userResult.insertId;

      // Insert login data into the Login table
      const loginQuery = "INSERT INTO Login (user_id, username, password) VALUES (?, ?, ?)";
      db.query(loginQuery, [user_id, username, hashedPassword], (err, loginResult) => {
        if (err) {
          return res.status(500).json({ message: "Error saving login details", error: err });
        }

        // Optionally insert default preferences for the user into User Preferences
        const preferencesQuery = "INSERT INTO User_Preferences (user_id, notifications, summaries, bias_analysis, time_goal) VALUES (?, ?, ?, ?, ?)";
        db.query(preferencesQuery, [user_id, true, true, false, 30], (err, preferencesResult) => {
          if (err) {
            return res.status(500).json({ message: "Error saving user preferences", error: err });
          }

          res.status(201).json({ message: "User registered successfully" });
        });
      });
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});