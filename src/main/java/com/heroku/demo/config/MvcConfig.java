package com.heroku.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MvcConfig extends WebMvcConfigurerAdapter {

	@Override
	public void addResourceHandlers(final ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/**").addResourceLocations("classpath:/static/", "classpath:/templates/");
	}

	@CrossOrigin(origins = "https://mcfg0klxd9y05gglhh34vvrzg1gm-h4.rest.marketingcloudapis.com/platform/v1/tokenContext")
	@GetMapping("/getMid")
	public String getMid(@PathVariable String value) {
		return value;
	}

}
