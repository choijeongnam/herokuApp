package com.heroku.demo.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.security.web.util.matcher.IpAddressMatcher;
import org.springframework.stereotype.Component;

@Component
public class IpAddressMatcherManager {

	private List<IpAddressMatcher> ipAddressMatchers;

	public IpAddressMatcherManager() {
        this.ipAddressMatchers = Arrays.asList(
                new IpAddressMatcher("13.110.208.5/15")
        );
    }
	
	public List<IpAddressMatcher> getIpAddressMatchers() {
		return ipAddressMatchers;
	}
	
}
