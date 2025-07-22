const admin = require("firebase-admin");
const serviceAccount = require("./config/firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "crud-wacg-2025-1e5db.firebasestorage.app",
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { db, bucket };
