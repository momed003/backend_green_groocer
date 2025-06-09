// firebase.js
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const serviceAccount = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../adminsdk.json'), 'utf-8')
);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}git add config/Connecion.jsgit

const db = admin.firestore();

module.exports = { admin, db };