package com.heroku.demo.service;

import java.util.HashMap;

import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.heroku.demo.domain.NotificationRequest;

@Service
public class NotificationService {
	private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);

    private final FCMSettingService fcmSettingService;

    private final Map<String, String> tokenMap = new HashMap<String, String>();

    @Autowired
    public NotificationService(final FCMSettingService fcmSettingService) {
        this.fcmSettingService = fcmSettingService;
    }

    public void deleteToken(final String userId) {
        tokenMap.remove(userId);
    }

    public String getToken(final String userId) {
        return tokenMap.get(userId);
    }

}
