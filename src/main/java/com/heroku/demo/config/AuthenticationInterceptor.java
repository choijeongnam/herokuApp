package com.heroku.demo.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.heroku.demo.service.UserService;
@Component
public class AuthenticationInterceptor extends HandlerInterceptorAdapter {
	
	private UserService userService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String clientIp = request.getHeader("X-Forwarded-For");
		
		 if (clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) { 
		     clientIp = request.getHeader("Proxy-Client-IP"); 
		 } 
		 if (clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) { 
		     clientIp = request.getHeader("WL-Proxy-Client-IP"); 
		 } 
		 if (clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) { 
		     clientIp = request.getHeader("HTTP_CLIENT_IP"); 
		 } 
		 if (clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) { 
		     clientIp = request.getHeader("HTTP_X_FORWARDED_FOR"); 
		 } 
		 if (clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) { 
		     clientIp = request.getRemoteAddr(); 
		 }
		
		 System.out.println(clientIp);
		try {
			if(!userService.isAccessible(clientIp)) {
				String requestuestURI = request.getRequestURI();
				System.out.println(requestuestURI);
				response.sendError(401);
				return false;
			}
		}catch(NullPointerException e) {
			response.sendError(401);
			return false;
		}
		return true;
	}
}
