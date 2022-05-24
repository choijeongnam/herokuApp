package com.heroku.demo.controller;

import java.util.concurrent.ExecutionException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.heroku.demo.domain.NotificationRequest;
import com.heroku.demo.repository.RecordRepository;
import com.heroku.demo.service.FCMSettingService;
import com.heroku.demo.service.NotificationService;
import com.heroku.demo.service.UserService;

@RestController
public class NotiRestController {
	private final NotificationService notificationService;

	@Autowired
	private FCMSettingService fcmSettingService;
	
	@Autowired
	private RecordRepository repository;

	@Autowired
	private UserService userService;

	public NotiRestController(NotificationService notificationService) {
	this.notificationService = notificationService;
	}

	@PostMapping(value="/register", produces="application/json;")
	public ResponseEntity<NotificationRequest> register(@RequestBody NotificationRequest notificationRequest) {
		try {
        	fcmSettingService.send(notificationRequest);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
		System.err.println("token : " + notificationRequest.getToken());
	return ResponseEntity.ok().build();
	}

}
