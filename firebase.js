// Firebase initialization (compat version)
// This script is shared by dashboard.html and admin.html

const firebaseConfig = {
  apiKey: "AIzaSyBWWozjvNyGTuYQf-uO1J_ag1VoEy-_iEA",
  authDomain: "our-digital-class.firebaseapp.com",
  projectId: "our-digital-class",
  storageBucket: "our-digital-class.appspot.com",
  messagingSenderId: "1052616791568",
  appId: "1:1052616791568:web:5cf02ee989f0f549ba9c95",
  measurementId: "G-25LTH5JQ6D"
};

// Initialize Firebase only if it hasn't been initialized yet
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
