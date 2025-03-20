const express = require('express');
const path = require('path');
const session = require('express-session');
const pool = require('./db'); // PostgreSQL connection
const bcrypt = require('bcrypt'); // For hashing passwords
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware to protect routes
function isAuthenticated(req, res, next) {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
}

// ========== ROUTES ========== //

// ✅ SIGNUP
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'login.html'));
});

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2)',
            [username, hashedPassword]
        );
        res.send('Signup successful! <a href="/login">Login here</a>');
    } catch (err) {
        console.error(err);
        res.send('Error: Username might already exist. <a href="/signup">Try again</a>');
    }
});

// ✅ SIMPLIFIED FORGOT PASSWORD ROUTE (NO EMAIL, JUST USERNAME CHECK)
app.post('/forgot-password', async (req, res) => {
    const { username } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.send('No user found with this username. <a href="/login">Try again</a>');
        }

        // ✅ Redirect directly to reset-password with username in query params
        res.redirect(`/reset-password?username=${username}`);
    } catch (err) {
        console.error(err);
        res.send('Something went wrong. <a href="/login">Try again</a>');
    }
});

// ✅ SIMPLIFIED RESET PASSWORD GET ROUTE
app.get('/reset-password', (req, res) => {
    const username = req.query.username;

    if (!username) {
        return res.send('Invalid or missing username. <a href="/login">Try again</a>');
    }

    // ✅ Serve the reset_password.html file
    res.sendFile(path.join(__dirname, 'view', 'reset_password.html'));
});


// ✅ SIMPLIFIED RESET PASSWORD POST ROUTE
app.post('/reset-password', async (req, res) => {
    const { username, newPassword } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const result = await pool.query(
            'UPDATE users SET password = $1 WHERE username = $2',
            [hashedPassword, username]
        );

        if (result.rowCount === 0) {
            return res.send('User not found. <a href="/login">Try again</a>');
        }

        res.send('Password reset successfully! <a href="/login">Login</a>');
    } catch (err) {
        console.error(err);
        res.send('Something went wrong. <a href="/login">Try again</a>');
    }
});

// ✅ LOGIN ROUTES (No change)
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'login.html'));
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.send('No user found. <a href="/login">Try again</a>');
        }

        const user = result.rows[0];

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.loggedIn = true;
            req.session.user = user.username;
            res.redirect('/index');
        } else {
            res.send('Incorrect password. <a href="/login">Try again</a>');
        }
    } catch (err) {
        console.error(err);
        res.send('Something went wrong. <a href="/login">Try again</a>');
    }
});

// ✅ LOGOUT
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// ✅ PROTECTED ROUTES
app.get('/index', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.get('/contact_page', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'contact_page.html'));
});

app.get('/about_us', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'about_us.html'));
});

app.get('/rent_car', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'rent_car.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
