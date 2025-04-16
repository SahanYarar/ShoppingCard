const { admin, db } = require('../config/firebase');
const axios = require('axios');

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log('Registering user:', { email, name });

    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name
    });
    console.log('User created in Firebase Auth:', userRecord.uid);

    try {
      // Create user document in Firestore
      const userData = {
        email,
        name,
        createdAt: new Date().toISOString()
      };
      
      // Check if Firestore is initialized
      if (!db) {
        console.warn('Firestore not initialized, skipping Firestore write');
      } else {
        try {
          // Create the users collection if it doesn't exist
          const userRef = db.collection('users').doc(userRecord.uid);
          await userRef.set(userData);
          console.log('User data stored in Firestore:', userData);
        } catch (firestoreError) {
          if (firestoreError.code === 5) {
            console.warn('Firestore database might not be initialized. Please check Firebase Console.');
            // Don't delete the auth user in this case
            console.log('Keeping auth user despite Firestore error');
          } else {
            throw firestoreError;
          }
        }
      }
    } catch (firestoreError) {
      console.error('Firestore error:', {
        code: firestoreError.code,
        message: firestoreError.message,
        stack: firestoreError.stack,
        details: firestoreError.details || 'No additional details'
      });
      
      // Only delete the auth user if it's not a Firestore initialization error
      if (firestoreError.code !== 5) {
        try {
          await admin.auth().deleteUser(userRecord.uid);
          console.log('Auth user deleted due to Firestore error');
        } catch (deleteError) {
          console.error('Error deleting auth user:', {
            code: deleteError.code,
            message: deleteError.message,
            stack: deleteError.stack
          });
        }
        throw new Error(`Failed to store user data in Firestore: ${firestoreError.message}`);
      }
    }

    // Generate custom token for immediate login
    const token = await admin.auth().createCustomToken(userRecord.uid);
    console.log('Custom token generated');

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        name: userRecord.displayName
      }
    });
  } catch (error) {
    console.error('Registration error:', {
      code: error.code,
      message: error.message,
      stack: error.stack,
      details: error.details || 'No additional details'
    });
    
    // Handle specific Firebase errors
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    if (error.code === 'auth/invalid-email') {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }
    
    if (error.code === 'auth/weak-password') {
      return res.status(400).json({
        success: false,
        message: 'Password is too weak'
      });
    }

    res.status(400).json({
      success: false,
      message: error.message || 'Registration failed'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    // Sign in with email and password using Firebase REST API
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    );

    const { localId, email: userEmail, displayName } = response.data;
    console.log('User authenticated:', localId);

    // Get user data from Firestore
    let userData = null;
    if (db) {
      try {
        const userDoc = await db.collection('users').doc(localId).get();
        userData = userDoc.data();
        console.log('User data retrieved from Firestore');
      } catch (firestoreError) {
        console.warn('Error retrieving Firestore data:', firestoreError);
      }
    }

    // Create a custom token for the user
    const token = await admin.auth().createCustomToken(localId);
    console.log('Custom token generated');

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        uid: localId,
        email: userEmail,
        name: displayName || (userData?.name || 'User')
      }
    });
  } catch (error) {
    console.error('Login error:', {
      code: error.response?.data?.error?.code,
      message: error.response?.data?.error?.message || error.message,
      stack: error.stack
    });
    
    if (error.response?.data?.error?.message === 'INVALID_PASSWORD' || 
        error.response?.data?.error?.message === 'EMAIL_NOT_FOUND') {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    if (error.response?.data?.error?.message === 'INVALID_EMAIL') {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    res.status(401).json({
      success: false,
      message: 'Login failed'
    });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    console.log('Verifying token');
    // Verify the token
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('Token verified for user:', decodedToken.uid);
    
    let userData = null;
    if (db) {
      try {
        const userDoc = await db.collection('users').doc(decodedToken.uid).get();
        userData = userDoc.data();
        console.log('User data retrieved from Firestore');
      } catch (firestoreError) {
        console.warn('Error retrieving Firestore data:', firestoreError);
      }
    }

    res.json({
      success: true,
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: userData?.name || decodedToken.name || 'User'
      }
    });
  } catch (error) {
    console.error('Token verification error:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }
    
    if (error.code === 'auth/invalid-id-token') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    res.status(401).json({
      success: false,
      message: 'Token verification failed'
    });
  }
}; 