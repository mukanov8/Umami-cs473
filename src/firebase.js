import firebase from 'firebase'


const firebaseApp = firebase.initializeApp( {
  apiKey: "AIzaSyByXdalffwIP46lfo0LD7u3DgT3KC4x94E",
  authDomain: "umami-80960.firebaseapp.com",
  databaseURL: "https://umami-80960.firebaseio.com",
  projectId: "umami-80960",
  storageBucket: "umami-80960.appspot.com",
  messagingSenderId: "481376756238",
  appId: "1:481376756238:web:534d3dfea1e6e95c7ad25f"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth, storage};