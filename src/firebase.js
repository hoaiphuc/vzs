import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDE9PJl3jNGQEbfFrezEzr7uzLUBVSV_pA",
  authDomain: "sell-everything-84f04.firebaseapp.com",
  projectId: "sell-everything-84f04",
  storageBucket: "sell-everything-84f04.appspot.com",
  messagingSenderId: "335132757429",
  appId: "1:335132757429:web:7756433dadfa28dd49ddfc",
  measurementId: "G-4YX4VHLBCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
          console.log('Notification permission granted.');
          const messaging = getMessaging(app);
          getToken(messaging, { vapidKey: 'BA6R6TtWlfyibVYjbYcLzCqRHF8cVzFvIJwast2o8JKtnaOHjAp6Mwuj6ZDtM0RZXv0vqLk466ZwYuOdjCSLbrI' })
              .then((currentToken) => {
                  if (currentToken) {
                      console.log('currentToken: ', currentToken);
                  } else {
                      console.log('cant not get token');
                  }
              });
      } else {
          console.log('Do not have permission');
      }
  });
}

requestPermission();