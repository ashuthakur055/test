import React from 'react';
import { auth, app } from '../../../../firebase'; // Import the firebase instance
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'; // Import signInWithPopup and GoogleAuthProvider directly
export const handleSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    let result = await signInWithPopup(auth, provider);
    const credential = result.credential;
    const user = result.user;
    console.log(user);
  } catch (error) {
    console.error('Error signing in with Google:', error);
  }
};
export const logOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('Signed out successfully.');
    })
    .catch(error => {
      // An error happened.
      console.error('Sign-out error:', error);
    });
};
