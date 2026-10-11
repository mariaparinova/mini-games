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
  apiKey: 'AIzaSyCiXkhsTDiogu83bzD7KrlTGuYdlUU7-lQ',
  authDomain: 'minigames-e7a71.firebaseapp.com',
  projectId: 'minigames-e7a71',
  storageBucket: 'minigames-e7a71.firebasestorage.app',
  messagingSenderId: '936792906131',
  appId: '1:936792906131:web:75864867035d882186b066',
  measurementId: 'G-CZ92FP5HVE',
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
