importScripts('https://www.gstatic.com/firebasejs/8.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.0/firebase-messaging.js');

firebase.initializeApp({
	apiKey: "AIzaSyBg2RYyAP5d1HmIXh94MvulrVkACsfZb4w",
	authDomain: "lotte-web.firebaseapp.com",
	projectId: "lotte-web",
	storageBucket: "lotte-web.appspot.com",
	messagingSenderId: "466488345000",
	appId: "1:466488345000:web:e33c6817b53f131ce3dd9d",
	measurementId: "G-TMKYCNW9T1"
});

const messaging = firebase.messaging();