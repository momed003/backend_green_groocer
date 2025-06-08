const express = require('express');
const { db } = require('../config/Connecion');
const router = express.Router()

 const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef
            .where('email', '==', email)
            .where('password', '==', password)
            .get();

        if (snapshot.empty) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();
        delete userData.password;

        return res.status(200).json({
            message: 'Login successful',
            userId: userDoc.id,
            user: userData
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

router.post('/login', loginUser);

module.exports = router;
