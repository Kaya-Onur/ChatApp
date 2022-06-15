// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5pKc6ipovqGmmciJA2m4jufYgIRlN-iQ",
  authDomain: "chattapp-dd7c2.firebaseapp.com",
  projectId: "chattapp-dd7c2",
  storageBucket: "chattapp-dd7c2.appspot.com",
  messagingSenderId: "946368412269",
  appId: "1:946368412269:web:5d79147d1d28808c67dd64"
};

let app;
if(firebase.apps.length===0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app();
}

const auth=firebase.auth();
const firestore=firebase.firestore()

export {auth,firestore};
