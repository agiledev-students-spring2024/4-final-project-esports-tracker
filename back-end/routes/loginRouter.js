const express = require('express');
const router = express.Router();

//should set up db later 
const users = [];

//should set up hashing for security later
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = { username, password }; 
    users.push(newUser);
    res.status(201).json({ message: 'User created', user: newUser });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Logged in successfully' });
});

module.exports = router;
