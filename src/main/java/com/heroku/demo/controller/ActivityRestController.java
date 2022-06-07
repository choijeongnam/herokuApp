package com.heroku.demo.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.net.URI;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.junit.Test;

@RestController
public class ActivityRestController {

	@RequestMapping(value = "/activity/save", method = { RequestMethod.GET, RequestMethod.POST })
	public ResponseEntity<String> save(HttpServletRequest request, ModelMap model) throws Exception {

		return new ResponseEntity<String>("save", HttpStatus.OK);

	}

	@RequestMapping(value = "/activity/publish", method = { RequestMethod.GET, RequestMethod.POST })
	public ResponseEntity<String> publish(HttpServletRequest request, ModelMap model) throws Exception {

		return new ResponseEntity<String>("publish", HttpStatus.OK);

	}

	@RequestMapping(value = "/activity/validate", method = { RequestMethod.GET, RequestMethod.POST })
	public ResponseEntity<String> validate(HttpServletRequest request, ModelMap model) throws Exception {

		return new ResponseEntity<String>("validate", HttpStatus.OK);

	}

	@RequestMapping(value = "/activity/stop", method = { RequestMethod.GET, RequestMethod.POST })
	public ResponseEntity<String> stop(HttpServletRequest request, ModelMap model) throws Exception {

		return new ResponseEntity<String>("stop", HttpStatus.OK);

	}

	@RequestMapping(value = "/activity/execute", method = { RequestMethod.GET, RequestMethod.POST })
	public ResponseEntity<String> execute(HttpServletRequest request, ModelMap model) throws Exception {
		
		String token_url = "https://mc5g0q6ffd8sglpqt05jl03zy-h4.auth.marketingcloudapis.com/v2/token";
				
		RestTemplate restTemplate = new RestTemplate(); // 비동기 전달
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(MediaType.APPLICATION_JSON);
		
		MultiValueMap<String, String> body = new LinkedMultiValueMap<>();

      	body.add("grant_type", "client_credentials");
		body.add("client_id", "xkcpey49qsmasdneeb2bd9y0");
		body.add("client_secret", "s3IN8RlOlnzbgYRVoFfxPLU4");

		// Combine Message
		HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);
		ResponseEntity<String> result  = restTemplate.postForEntity(token_url, requestMessage, String.class);

		System.out.println(result.toString());
		
//		String token_url = "https://mc5g0q6ffd8sglpqt05jl03zy-h4.auth.marketingcloudapis.com/v2/token";
//		URI uri = URI.create("https://mc5g0q6ffd8sglpqt05jl03zy-h4.auth.marketingcloudapis.com/v2/token");
//		RestTemplate restTemplate = new RestTemplate(); // 비동기 전달
//		HttpHeaders httpHeaders = new HttpHeaders();
//		httpHeaders.setContentType(MediaType.APPLICATION_JSON);
//		
//		MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
//
//      	body.add("grant_type", "client_credentials");
//		body.add("client_id", "xkcpey49qsmasdneeb2bd9y0");
//		body.add("client_secret", "s3IN8RlOlnzbgYRVoFfxPLU4");
//
//		// Combine Message
//		HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);
//
//		// Request.. response해야하나..아무튼..
//		//restTemplate.postForEntity(token_url, requestMessage, String.class);
//		ResponseEntity<String> result  = restTemplate.exchange(uri, HttpMethod.POST, requestMessage, String.class);
//		System.out.println(requestMessage.getHeaders());
//		System.out.println(requestMessage.getBody());
//		System.out.println(result.toString());
		
//		
//		/////////////////////////발송이력 insert START
//		RestTemplate restTemplate = new RestTemplate(); // 비동기 전달
//		String url = "https://mc5g0q6ffd8sglpqt05jl03zy-h4.rest.marketingcloudapis.com/data/v1/async/dataextensions/key:5AB4E2EF-4C4D-430C-90B3-71AF493A7A1D/rows";
//		String access_token = "2PAt0DjSGtX1EFm1ObMYY1rm";
//		
//		// Header set
//		HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
//        httpHeaders.set("Authorization", "Bearer " + access_token);
//        
//        // Body set
//        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
//        body.add("bu_id", request.getParameter("bu_id"));
//        body.add("journey_id", request.getParameter("journey_id"));
//        body.add("mkt_id", request.getParameter("mkt_id"));
//        body.add("mkt_dept_cd", request.getParameter("mkt_dept_cd"));
//        body.add("campaign_code", request.getParameter("campaign_code"));
//        body.add("chnl_cd", request.getParameter("chnl_cd"));
//        body.add("unif_id", request.getParameter("unif_id"));
//        body.add("sfmc_id", request.getParameter("sfmc_id"));
//        
//        // Combine Message
//        HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);
//
//        // Request.. response해야하나..아무튼..
//        restTemplate.postForEntity(url, requestMessage, String.class);
//        /////////////////////////발송이력 insert END
		
//		RestTemplate restTemplate = new RestTemplate(); // 비동기 전달
//		HttpHeaders httpHeaders = new HttpHeaders();
//		httpHeaders.setContentType(MediaType.APPLICATION_JSON);
//		//httpHeaders.set("Authorization", url);
//		JSONObject jsonObject = new JSONObject();
//
//		jsonObject.put("grant_type", "client_credentials");
//		jsonObject.put("client_id", "xkcpey49qsmasdneeb2bd9y0");
//		jsonObject.put("client_secret", "s3IN8RlOlnzbgYRVoFfxPLU4");
//
//		HttpEntity<String> logRequest = new HttpEntity<>(jsonObject.toString(), httpHeaders);
//		ResponseEntity<String> res = restTemplate.postForEntity(url, logRequest, String.class);
//		System.out.println(res.getStatusCode());
//		System.out.println(res.getHeaders());
//		System.out.println(res.getBody());
		
		
//		StringBuffer sb = new StringBuffer();
//	    BufferedReader bufferedReader = null;
//	    String content = "";
//
//	    try {
//	        bufferedReader =  request.getReader() ;
//	        char[] charBuffer = new char[128];
//	        int bytesRead;
//	        while ( (bytesRead = bufferedReader.read(charBuffer)) != -1 ) {
//	            sb.append(charBuffer, 0, bytesRead);
//	        }
//
//	    } catch (IOException ex) {
//	        throw ex;
//	    } finally {
//	        if (bufferedReader != null) {
//	            try {
//	                bufferedReader.close();
//	            } catch (IOException ex) {
//	                throw ex;
//	            }
//	        }
//	    }
//
//	    System.out.println("[BODY] :" + sb.toString());
//	    System.out.println("[BODY] 끝!!!");
//
//	    System.out.println("[파라미터 출력시작]");
//	    for(String paramKey: request.getParameterMap().keySet()) {
//	    	System.out.println("KEY: " + paramKey);
//	    	for(String val: request.getParameterMap().get(paramKey)) {
//	    		System.out.println("VALUE: " + val);
//	    	}
//
//	    }
//
//		String url = "https://mc5g0q6ffd8sglpqt05jl03zy-h4.auth.marketingcloudapis.com/v2/token";
//
//		RestTemplate restTemplate = new RestTemplate(); // 비동기 전달
//		HttpHeaders httpHeaders = new HttpHeaders();
//		httpHeaders.setContentType(MediaType.APPLICATION_JSON);
//
//		JSONObject jsonObject = new JSONObject();
//
//		jsonObject.put("grant_type", "client_credentials");
//		jsonObject.put("client_id", "xkcpey49qsmasdneeb2bd9y0");
//		jsonObject.put("client_secret", "s3IN8RlOlnzbgYRVoFfxPLU4");
//
//		HttpEntity<String> logRequest = new HttpEntity<>(jsonObject.toString(), httpHeaders);
//		ResponseEntity<String> res = restTemplate.postForEntity(url, logRequest, String.class);
//		System.out.println(res.getStatusCode());
//		System.out.println(res.getHeaders());
//		System.out.println(res.getBody());

		return new ResponseEntity<String>("execute", HttpStatus.OK);
	}

}
