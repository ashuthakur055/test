import axiosApi from '../../services/axiosApi';
import userTypes from '../constants/userTypes';
import { setCookie, removeCookie, getCookie } from '../../services/cookies';
import { auth, firestore, storage } from '../../../firebase'; // Import Firebase configuration
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithPopup and GoogleAuthProvider directly

export const signInWithGoogle = () => {
  return async dispatch => {
    try {
      const provider = new GoogleAuthProvider();
      let result = await signInWithPopup(auth, provider);
      const user = result.user;
      let accessToken = user.stsTokenManager.accessToken;
      let date = new Date();
      date.setTime(date.getTime() + user.stsTokenManager.expirationTime);
      setCookie('ssfToken', accessToken, user.stsTokenManager.expirationTime);
      setCookie('ssfTime', date.toUTCString(), user.stsTokenManager.expirationTime);
      setCookie('ssfrft', user.stsTokenManager.refreshToken, user.stsTokenManager.expirationTime);
      if (user) {
        let userData = {
          user: user,
          accessToken: accessToken,
        };
        sessionStorage.setItem('userData', JSON.stringify(user));
        dispatch({ type: userTypes.LOGIN_SUCCESS, payload: userData });
        dispatch({
          type: userTypes.STATUS,
          payload: { type: 'success', message: 'logged in sucessfully!' },
        });
      }
    } catch (error) {
      dispatch({
        type: userTypes.STATUS,
        payload: { type: 'failed', message: 'SIGN_IN_FAILURE' },
      });
    }
  };
};
export const logOut = () => {
  return async dispatch => {
    try {
      await signOut(auth);
      removeCookie('ssfToken');
      removeCookie('ssfTime');
      removeCookie('ssfrft');
      sessionStorage.removeItem('userData');
      dispatch({ type: userTypes.LOG_OUT });
    } catch (error) {
      dispatch({ type: 'SIGN_OUT_FAILURE', payload: error.message });
    }
  };
};

// User Authentication Actions
export const signUp = (email, password) => {
  return async dispatch => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw error;
    }
  };
};
export const signIn = (email, password) => {
  return async dispatch => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      let accessToken = user.stsTokenManager.accessToken;
      let date = new Date();
      date.setTime(date.getTime() + user.stsTokenManager.expirationTime);
      setCookie('ssfToken', accessToken, user.stsTokenManager.expirationTime);
      setCookie('ssfTime', date.toUTCString(), user.stsTokenManager.expirationTime);
      setCookie('ssfrft', user.stsTokenManager.refreshToken, user.stsTokenManager.expirationTime);
      if (user) {
        let userData = {
          user: user,
          accessToken: accessToken,
        };
        sessionStorage.setItem('userData', JSON.stringify(user));
        dispatch({ type: userTypes.LOGIN_SUCCESS, payload: userData });
        dispatch({
          type: userTypes.STATUS,
          payload: { type: 'success', message: 'logged in sucessfully!' },
        });
      }
    } catch (error) {
      dispatch({
        type: userTypes.STATUS,
        payload: { type: 'failed', message: 'SIGN_IN_FAILURE' },
      });
      return Promise.reject(error);
    }
  };
};

// Real-time Database Actions
export const fetchData = async () => {
  return async dispatch => {
    try {
      // Example: Fetch data from Firestore
      const snapshot = await firestore.collection('collectionName').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw error;
    }
  };
};

// File Storage Actions
export const uploadFile = async file => {
  return async dispatch => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      return fileRef.getDownloadURL();
    } catch (error) {
      throw error;
    }
  };
};

// Cloud Functions Actions
export const triggerCloudFunction = async data => {
  return async dispatch => {
    try {
      // Example: Trigger a Cloud Function
      const result = await firebase.functions().httpsCallable('functionName')(data);
      return result.data;
    } catch (error) {
      throw error;
    }
  };
};
