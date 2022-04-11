import './App.css';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import Form from './Form';
function App() {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCN5cLKw8e_sidV2U8PNBmvqsOw0vSSIRc",
    authDomain: "fir-auth-caba1.firebaseapp.com",
    projectId: "fir-auth-caba1",
    storageBucket: "fir-auth-caba1.appspot.com",
    messagingSenderId: "392122146328",
    appId: "1:392122146328:web:c9dba32b11b748f4072d6d",
    measurementId: "G-F2VDKDD5FG"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
  return <>
    <Form />
  </>
}

export default App;
