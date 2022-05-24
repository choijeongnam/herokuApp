package com.heroku.demo.service;

import java.util.concurrent.ExecutionException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.WebpushConfig;
import com.google.firebase.messaging.WebpushFcmOptions;
import com.google.firebase.messaging.WebpushNotification;
import com.heroku.demo.domain.NotificationRequest;

@Service
public class FCMSettingService {
	private static final Logger logger = LoggerFactory.getLogger(FCMSettingService.class);

    public void send(NotificationRequest notificationRequest) throws InterruptedException, ExecutionException {
    	
    	WebpushNotification notification = WebpushNotification.builder()
    			.setTitle(notificationRequest.getTitle())
    			.setBody(notificationRequest.getMessage())
    			.setImage(notificationRequest.getImage())
    			.setIcon(notificationRequest.getIcon())
    			.setRequireInteraction(true)
    			.setData(notificationRequest.getLink())
    			.build();
    	  
        Message message = Message.builder()
                	.setToken(notificationRequest.getToken())
                	.setWebpushConfig(WebpushConfig.builder()
                						.setNotification(notification)
                						.setFcmOptions(WebpushFcmOptions.withLink(notificationRequest.getLink()))
                						.build())
                	.build();
        
        String response = FirebaseMessaging.getInstance().sendAsync(message).get();
        logger.info("Sent message: " + response);
    }
}
