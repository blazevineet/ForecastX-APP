const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- CONFIGURATION ---
// In a real app, this should be a long, random string in a .env file
const JWT_SECRET = 'your-super-secret-key-12345'; 
const SALT_ROUNDS = 10;
// --------------------

// This is our simple, in-memory database.
// In a real app, use a database like PostgreSQL or MongoDB.
const usersDB = [];

/**
 * Endpoint 1: Register a new user
 */
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if user already exists
        const existingUser = usersDB.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Save the new user
        const newUser = { email: email, passwordHash: hashedPassword };
        usersDB.push(newUser);
        
        console.log('User registered:', newUser);
        res.status(201).json({ message: 'User registered successfully!' });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Endpoint 2: Log in a user
 */
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find the user
        const user = usersDB.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the password with the stored hash
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // SUCCESS! Create a JWT token
        // This token proves the user is logged in
        const token = jwt.sign(
            { email: user.email }, // This is the "payload"
            JWT_SECRET,            // This is the secret key
            { expiresIn: '1d' }    // The token expires in 1 day
        );
        
        console.log(`User ${email} logged in successfully.`);
        res.status(200).json({ message: 'Login successful', token: token });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend server for ForecastX running on http://localhost:${PORT}`);
});