import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyC9Wr3o7qGV2_WdZe68E_X-ZENAQ1lbIug",
  authDomain: "psu-engineer-jobboard.firebaseapp.com",
  projectId: "psu-engineer-jobboard",
  storageBucket: "psu-engineer-jobboard.appspot.com",
  messagingSenderId: "856725106593",
  appId: "1:856725106593:web:23913765c629996a0ce5e0",
  measurementId: "G-JHXDBVYWPL"
})
export const auth = app.auth()
// Initialize Firebase
export default app
