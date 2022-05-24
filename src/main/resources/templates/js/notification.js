const firebaseModule = (function () {
    async function init() {
        // Your web app's Firebase configuration
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/firebase-messaging-sw.js')
                    .then(registration => {
                        var firebaseConfig = {
	                    		apiKey: "AIzaSyBg2RYyAP5d1HmIXh94MvulrVkACsfZb4w",
	                    		authDomain: "lotte-web.firebaseapp.com",
	                    		projectId: "lotte-web",
	                    		storageBucket: "lotte-web.appspot.com",
	                    		messagingSenderId: "466488345000",
	                    		appId: "1:466488345000:web:e33c6817b53f131ce3dd9d",
	                    		measurementId: "G-TMKYCNW9T1"
                        };
                        firebase.messaging.isSupported();
                        console.log(firebase.messaging.isSupported());
                        // Initialize Firebase
                        firebase.initializeApp(firebaseConfig);
			
                        // Show Notificaiton Dialog
                        const messaging = firebase.messaging();
                        messaging.requestPermission()
                        .then(function() {
                            return messaging.getToken();
                        })
                        .then(async function(token) {
							let data = { "token": token,
										 "title": "test",
										 "message": "test",
										 "icon": "https://www.lottehotel.com/content/dam/lottehotel/components/common/structure/header/gnb_logo_cityhotels.png",
										 "image": "https://www.lottehotel.com/content/dam/lotte-hotel/city/daejeon/promotion/package/20220422-01-1440-pkg-LTDJ.jpg.thumb.1920.1920.jpg",
										 "link": "https://www.naver.com"
							};
                            await fetch('/register', { method: 'post', headers: {'Content-Type': 'application/json'},body: JSON.stringify(data)})
                            messaging.onMessage((payload) => {
                            	console.log('[firebase-messaging-sw.js] Received background message ', payload);
                                const title = payload.notification.title;
                                const options = {
                                        body : payload.notification.body,
                                        icon : payload.notification.icon,
                                        image : payload.notification.image,
                                        click_action : payload.notification.click_action,
                                        requireInteraction : payload.notification.requireInteraction,
                                        
                                };
                                								
                                navigator.serviceWorker.ready.then( function() {
                                	/*registration.showNotification(title, options);*/
                                	const notification = new Notification(title, options);
                                	
                                	notification.onclick = event => {
								   		event.preventDefault();
								   		window.open(payload.notification.data, '_blank');
									};
                                })
								
                            })
                        })
                        .catch(function(err) {
                            console.log("Error Occured");
                        })
                    })
            })
        }
    }

    return {
        init: function () {
            init()
        }
    }
})()

firebaseModule.init();