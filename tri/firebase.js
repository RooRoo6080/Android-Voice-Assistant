import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyApOe3aHN5XoOrUF2YLhCwTokdkmaTRjo0",
  authDomain: "trivalley-5698a.firebaseapp.com",
  projectId: "trivalley-5698a",
  storageBucket: "trivalley-5698a.appspot.com",
  messagingSenderId: "907764184094",
  appId: "1:907764184094:web:cc51cfcbed2a2726e26a0f",
  measurementId: "G-EGPMXBCGLB",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const auth = firebase.auth(app);

export { db, auth, app };
