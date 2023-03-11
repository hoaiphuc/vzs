importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyBsBwRW5o-iUjokOv_lJ970jLsPkiBwB6M",
    authDomain: "secondhandvh-44c3e.firebaseapp.com",
    projectId: "secondhandvh-44c3e",
    storageBucket: "secondhandvh-44c3e.appspot.com",
    messagingSenderId: "798402416096",
    appId: "1:798402416096:web:28167507165a50b17bef85",
    measurementId: "G-6EC489LJ21"
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