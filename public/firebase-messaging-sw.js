importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDE9PJl3jNGQEbfFrezEzr7uzLUBVSV_pA",
  authDomain: "sell-everything-84f04.firebaseapp.com",
  projectId: "sell-everything-84f04",
  storageBucket: "sell-everything-84f04.appspot.com",
  messagingSenderId: "335132757429",
  appId: "1:335132757429:web:7756433dadfa28dd49ddfc",
  measurementId: "G-4YX4VHLBCC"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});