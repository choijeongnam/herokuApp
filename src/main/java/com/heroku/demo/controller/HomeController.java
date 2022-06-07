/*
 * Copyright 2022 sookyeonghan, jeongnamchoi
 */
package com.heroku.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.heroku.demo.repository.RecordRepository;

@Controller
public class HomeController {

    private RecordRepository repository;

    @Autowired
    public HomeController(RecordRepository repository) {
        this.repository = repository;
    }
    
    @RequestMapping(value="/", method = RequestMethod.GET)
    public String index(ModelMap model) {
    	return "index";
    }
}
