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
	/*
	 * @RequestMapping(value="/home", method = RequestMethod.GET) public String
	 * home(ModelMap model) { //List<Record> records = repository.findAll();
	 * //model.addAttribute("records", records); model.addAttribute("insertWebPush",
	 * new Webpush());
	 * 
	 * return "home"; }
	 * 
	 * @RequestMapping(value="/home", method = RequestMethod.POST) public String
	 * insertData(ModelMap model,
	 * 
	 * @ModelAttribute("insertWebPush") @Valid Webpush webpush, BindingResult
	 * result, HttpSession session) { if (!result.hasErrors()) {
	 * webpushRepository.save(webpush); } return home(model); }
	 */
}
