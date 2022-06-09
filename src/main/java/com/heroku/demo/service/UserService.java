package com.heroku.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {

//	private final IpAddressMatcherManager ipAddressMatcherManager;
//
//	public UserService(RecordRepository recordRepository) {
//		this.ipAddressMatcherManager = new IpAddressMatcherManager();
//	}
//	
//	public boolean isAccessible(String ipAddress) {
//		List<IpAddressMatcher> ipAddressMatchers = ipAddressMatcherManager.getIpAddressMatchers();
//		return ipAddressMatchers.stream().anyMatch(matcher -> matcher.matches(ipAddress));
//	}
}
