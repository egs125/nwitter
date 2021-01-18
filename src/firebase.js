import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  //   apiKey: "AIzaSyDhyqiBB3WqLEcF5wPKiY4FSJYekEVohCo",
  //   authDomain: "nwitter-5661b.firebaseapp.com",
  //   projectId: "nwitter-5661b",
  //   storageBucket: "nwitter-5661b.appspot.com",
  //   messagingSenderId: "43842432441",
  //   appId: "1:43842432441:web:fb661d42eca72e8b709a68",
};

export default firebase.initializeApp(firebaseConfig);
