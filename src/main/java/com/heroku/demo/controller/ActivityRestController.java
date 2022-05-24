package com.heroku.demo.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ActivityRestController {
    
	@RequestMapping(value="/activity/save", method = {RequestMethod.GET, RequestMethod.POST})
	public ResponseEntity<String> save(HttpServletRequest request, ModelMap model) throws Exception {

		return new ResponseEntity<String>("save", HttpStatus.OK);

	}
	@RequestMapping(value="/activity/publish", method = {RequestMethod.GET, RequestMethod.POST})
	public ResponseEntity<String> publish(HttpServletRequest request, ModelMap model) throws Exception {

		return new ResponseEntity<String>("publish", HttpStatus.OK);

	}
	@RequestMapping(value="/activity/validate", method = {RequestMethod.GET, RequestMethod.POST})
	public ResponseEntity<String> validate(HttpServletRequest request, ModelMap model) throws Exception {

		return new ResponseEntity<String>("validate", HttpStatus.OK);

	}
	@RequestMapping(value="/activity/stop", method = {RequestMethod.GET, RequestMethod.POST})
	public ResponseEntity<String> stop(HttpServletRequest request, ModelMap model) throws Exception {

		return new ResponseEntity<String>("stop", HttpStatus.OK);

	}
	
	@RequestMapping(value="/activity/execute", method = RequestMethod.POST, produces="application/json;")
	public ResponseEntity<String> execute(HttpServletRequest request, ModelMap model) throws Exception {

		
		return new ResponseEntity<String>("execute", HttpStatus.OK);
	}
}
