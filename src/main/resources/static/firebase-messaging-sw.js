// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	apiKey: "AIzaSyCtHSTHw95PqQZCa1VawWG0NCRqUSOKTyA",
	authDomain: "lottehotel-web-push.firebaseapp.com",
	projectId: "lottehotel-web-push",
	storageBucket: "lottehotel-web-push.appspot.com",
	messagingSenderId: "44131432600",
	appId: "1:44131432600:web:996617819428bf5d0478ed",
	measurementId: "G-0SFKW8CVNM"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();