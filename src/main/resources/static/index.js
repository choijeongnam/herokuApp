// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCtHSTHw95PqQZCa1VawWG0NCRqUSOKTyA",
	authDomain: "lottehotel-web-push.firebaseapp.com",
	projectId: "lottehotel-web-push",
	storageBucket: "lottehotel-web-push.appspot.com",
	messagingSenderId: "44131432600",
	appId: "1:44131432600:web:996617819428bf5d0478ed",
	measurementId: "G-0SFKW8CVNM"
};

const endpointURL = "https://fcm.googleapis.com/fcm/send";

function getMessagingObject() {
	// [START messaging_get_messaging_object]
	const messaging = firebase.messaging();
	// [END messaging_get_messaging_object]
}

function receiveMessage() {
	const messaging = firebase.messaging();
	// [START messaging_receive_message]
	// Handle incoming messages. Called when:
	// - a message is received while the app has focus
	// - the user clicks on an app notification created by a service worker
	//   `messaging.onBackgroundMessage` handler.
	messaging.onMessage((payload) => {
		console.log('Message received. ', payload);
		var title = payload.notification.title || ''
		var options = {
			body: payload.notification.body || '',
			icon: payload.notification.body || '',
			image: payload.notification.image || ''
		};

		new Notification(title, options);
	});
	// [END messaging_receive_message]
}

function getToken() {
	const messaging = firebase.messaging();
	// [START messaging_get_token]
	// Get registration token. Initially this makes a network call, once retrieved
	// subsequent calls to getToken will return from cache.
	messaging.getToken({ vapidKey: 'BMyYPxiikEvOy6yAq1mfDVHTpgQg900Iwn2BY9ugF_Tp85k1-FX_o6S6haEwigvkv6ugk-ZTN-UVPXyHkOcAmss' }).then((currentToken) => {
		if (currentToken) {
			// Send the token to your server and update the UI if necessary
			console.log(currentToken);
			return currentToken;
		} else {
			// Show permission request UI
			console.log('No registration token available. Request permission to generate one.');
			// ...
		}
	}).catch((err) => {
		console.log('An error occurred while retrieving token. ', err);
		// ...
	});
	// [END messaging_get_token]
}

function requestPermission() {
	// [START messaging_request_permission]
	Notification.requestPermission().then((permission) => {
		if (permission === 'granted') {
			console.log('Notification permission granted.');
			// TODO(developer): Retrieve a registration token for use with FCM.
			// ...
		} else {
			console.log('Unable to get permission to notify.');
		}
	});
	// [END messaging_request_permission]
}

function deleteToken() {
	const messaging = firebase.messaging();

	// [START messaging_delete_token]
	messaging.deleteToken().then(() => {
		console.log('Token deleted.');
		// ...
	}).catch((err) => {
		console.log('Unable to delete token. ', err);
	});
	// [END messaging_delete_token]
}

async function callAPI() {
	const messaging = firebase.messaging();
	await messaging.getToken({ vapidKey: 'BMyYPxiikEvOy6yAq1mfDVHTpgQg900Iwn2BY9ugF_Tp85k1-FX_o6S6haEwigvkv6ugk-ZTN-UVPXyHkOcAmss' }).then((currentToken) => {
		if (currentToken) {
			let data = {
				"to": currentToken,
				"notification": {
					"title": document.getElementById('title').value,
					"body": document.getElementById('body').value,
					"icon": document.getElementById('icon').value,
					"image": document.getElementById('image').value
				}
			}
			 fetch(endpointURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "key=AAAACkZwOJg:APA91bH8I2T6-FzELlNtHo3qP3fe417MLbZqeVMya6VCtk3UoPtCoc3aiAuzp9x4skMTKpqwOpLy4x8bXpYn_2fzOrDs_WFKiHoOTLfZS2NPWEf6aJa1lNCEWaFpU49I0c2lyMtz90sY"
				},
				body: JSON.stringify(data),
			});
		} else {
			console.log('Register Notification!')
			return;
		}
	}).catch((err) => {
		console.log('An error occurred while retrieving token. ', err);
	});

}