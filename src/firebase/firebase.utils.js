import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyBNflCuNjTwDxUa94i1LHK8CsUoKzgysoE",
    authDomain: "crwn-db-7a8e5.firebaseapp.com",
    projectId: "crwn-db-7a8e5",
    storageBucket: "crwn-db-7a8e5.appspot.com",
    messagingSenderId: "942133537033",
    appId: "1:942133537033:web:cb5672c7f1e3db29d4cbd8"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const spanShot = await userRef.get();

    if (!spanShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

