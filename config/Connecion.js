
require('dotenv').config();
const admin = require('firebase-admin');

const rawCreds = JSON.parse(process.env.GOOGLE_CREDENTIALS);
rawCreds.private_key = rawCreds.private_key.replace(/\\n/g, '\n');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(rawCreds)
    });
}

const db = admin.firestore();

module.exports = { admin, db };