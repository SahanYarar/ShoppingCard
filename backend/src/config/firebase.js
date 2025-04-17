require('dotenv').config();
const admin = require('firebase-admin');
const path = require('path');

const serviceAccount = require('../../sahan-store-firebase-adminsdk-fbsvc-fc1a11f7de.json');

console.log('Initializing Firebase with project:', serviceAccount.project_id);

let db;
let auth;

try {
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id
  });
  
  console.log('Firebase Admin initialized successfully');
  console.log('Firebase App name:', app.name);
  
  db = admin.firestore();
  console.log('Firestore instance created');
  
  // Configure Firestore settings
  const settings = {
    timestampsInSnapshots: true,
    ignoreUndefinedProperties: true
  };
  
  db.settings(settings);
  console.log('Firestore settings configured:', settings);
  
  const testDoc = db.collection('test').doc('test');
  testDoc.set({ test: true })
    .then(() => {
      console.log('Firestore connection test successful');
      return testDoc.delete();
    })
    .then(() => {
      console.log('Test document cleaned up');
    })  
    .catch(error => {
      if (error.code === 5) {
        console.warn('Firestore database might not be initialized. Please check Firebase Console.');
      } else {
        console.error('Firestore connection error:', error);
      }
    });
  
  // Get Auth instance
  auth = admin.auth();
  console.log('Auth instance created');
  
} catch (error) {
  console.error('Firebase initialization error:', {
    code: error.code,
    message: error.message,
    stack: error.stack,
    details: error.details || 'No additional details'
  });
  throw error;
}

module.exports = {
  auth,
  admin,
  db
}; 