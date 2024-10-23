const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
    host: 'rabbithole-test-1.cx48um2o6kvm.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'Rabbithole1',
    database: 'rabbithole-test-1',
});

// Connect to MySQL
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Registration endpoint
app.post('/api/register', (req, res) => {
    const { first_name, last_name, email, phone_number } = req.body;

    // SQL query to insert user
    const sql = 'INSERT INTO user (first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?)';
    const values = [first_name, last_name, email, phone_number];

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Server Error');
        }
        res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
