import { initializeApp } from "firebase/app";
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

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            const messaging = getMessaging(app);
            getToken(messaging, { vapidKey: 'BHLt3Gsw1L4dxnKw_r1F6NlxNp688SM9Al6aDTmfUA_VFw7pRb_wF5eZrVbHb4CRVXvN9XLfk9xOujxqPIGAyik' })
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



