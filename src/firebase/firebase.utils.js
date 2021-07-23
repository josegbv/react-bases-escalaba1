// base importations
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// credentials
const config = {
  apiKey: "AIzaSyAA0hCkdYVJNrBvam9azbqrwAK_Bvb1pvE",
  authDomain: "bases-react-escalab.firebaseapp.com",
  projectId: "bases-react-escalab",
  storageBucket: "bases-react-escalab.appspot.com",
  messagingSenderId: "1051272924359",
  appId: "1:1051272924359:web:5cc5caec69e428cc77c2e2",
};

// Initialize Firebase
firebase.initializeApp(config);

// createProfileDocument function
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // reference doc in collection
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

// providers
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
