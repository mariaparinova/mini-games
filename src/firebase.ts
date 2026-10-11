import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { userData } from './user/user.ts';
import { updateHeaderButtons } from './pages/common-components/header/header.ts';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export async function firebaseCreateUser({ email, password, userName }: FirebaseCreateUser) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(userCredential.user, {
    displayName: userName,
  });

  return userCredential.user;
}

export async function firebaseLoginUser({ email, password }: FirebaseLoginUser) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function firebaseLoginWithGoogle() {
  const userCredential = await signInWithPopup(auth, googleProvider);
  return userCredential.user;
}

export async function firebaseLogoutUser() {
  await signOut(auth);
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    userData.email = user.email;
    userData.uid = user.uid;
    userData.userName = user.displayName;
  } else {
    userData.email = null;
    userData.uid = null;
    userData.userName = null;
  }

  updateHeaderButtons();
});

interface FirebaseLoginUser {
  email: string;
  password: string;
}

interface FirebaseCreateUser extends FirebaseLoginUser {
  userName: string;
}
