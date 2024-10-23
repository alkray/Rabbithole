const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

// Create Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow CORS for all requests
app.use(bodyParser.json()); // Parse JSON request bodies

// MySQL Database Configuration
const db = mysql.createConnection({
  host: 'rabbithole-test-1.cx48um2o6kvm.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'Rabbithole1',
  database: 'rabbithole-test-1', // your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Registration endpoint
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Check if username or email already exists
  const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(checkUserQuery, [username, email], (error, results) => {
    if (error) {
      console.error('Error querying the database:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      // User already exists
      return res.status(400).json({ message: 'Username or email already taken.' });
    }

    // Insert the new user into the database
    const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(insertUserQuery, [username, email, password], (insertError) => {
      if (insertError) {
        console.error('Error inserting user into database:', insertError);
        return res.status(500).json({ message: 'Internal server error' });
      }

      // Registration successful
      res.status(201).json({ message: 'User registered successfully!' });
    });
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists and passwords match
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  
  db.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Error querying the database:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      // Login successful
      res.status(200).json({ message: 'Login successful!' });
    } else {
      // Login failed
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
