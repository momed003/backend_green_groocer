import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import admin from 'firebase-admin';

// Utilidade para resolver __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lê o JSON manualmente
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
