/*
 * Copyright 2022 sookyeonghan, jeongnamchoi
 */
package com.heroku.demo.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.heroku.demo.domain.Record;
import com.heroku.demo.domain.Webpush;
import com.heroku.demo.repository.RecordRepository;
import com.heroku.demo.repository.WebpushRepository;

@Controller
public class HomeController {

    private RecordRepository repository;

    @Autowired
    private WebpushRepository webpushRepository;

    @Autowired
    public HomeController(RecordRepository repository) {
        this.repository = repository;
    }
    
    @RequestMapping(value="/", method = RequestMethod.GET)
    public String index(ModelMap model) {
    	return "index";
    }    

    @RequestMapping(value="/home", method = RequestMethod.GET)
    public String home(ModelMap model) {
    	//List<Record> records = repository.findAll();
        //model.addAttribute("records", records);
        model.addAttribute("insertWebPush", new Webpush());
        
        return "home";
    }

    @RequestMapping(value="/home", method = RequestMethod.POST)
    public String insertData(ModelMap model,
                             @ModelAttribute("insertWebPush") @Valid Webpush webpush,
                             BindingResult result, HttpSession session) {
        if (!result.hasErrors()) {
            webpushRepository.save(webpush);
        }
        return home(model);
    }
}
