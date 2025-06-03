import express from 'express';
import { admin, db } from '../config/Connecion.js';

export const registerUser = async (req, res) => {
    const userData = req.body;

    if (!userData.name || !userData.email || !userData.password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const userRef = db.collection('users');
        const userSnapshot = await userRef.where('email', '==', userData.email).get();

        if (!userSnapshot.empty) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const newUser = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            phone: userData.phone,
            nuit: userData.nuit,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const userDocRef = await db.collection('users').add(newUser);

        return res.status(201).json({
            message: 'User created successfully!',
            userId: userDocRef.id
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal error! Server not avaiable' });
    }
};

const router = express.Router();

router.post('/register', registerUser);

export default router;
