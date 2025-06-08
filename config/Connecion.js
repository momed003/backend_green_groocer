/*import fs from 'fs';
import pa th from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const serviceAccount = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../adminsdk.json'), 'utf-8')
);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

export { admin, db };
*/
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
}

const db = admin.firestore();

module.exports = { admin, db };
