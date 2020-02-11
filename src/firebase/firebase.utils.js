import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const config = {
    apiKey: "AIzaSyCjqhK3CVeh4cy-kUGQZYfYZfOQEIgcS1o",
    authDomain: "sortie-db.firebaseapp.com",
    databaseURL: "https://sortie-db.firebaseio.com",
    projectId: "sortie-db",
    storageBucket: "sortie-db.appspot.com",
    messagingSenderId: "843262490189",
    appId: "1:843262490189:web:1d165bcca38cef963c0e04",
    measurementId: "G-Y04J6NG7TX"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if(!userAuth) return;
	// Find user id
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();

	// console.log(snapShot);
	if(!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch(error) {
			console.log('error creating user ', error.message)
		}
	}

	return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;