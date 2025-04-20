require('dotenv').config();
const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin with environment variables
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: "googleapis.com"
};

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