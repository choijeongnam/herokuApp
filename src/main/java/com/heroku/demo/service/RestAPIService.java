package com.heroku.demo.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@Transactional
public class RestAPIService {
	
	public String getMid(String fuel2token){
		//dk String token_url = "https://mcfg0klxd9y05gglhh34vvrzg1gm.rest.marketingcloudapis.com/platform/v1/tokenContext";
		String token_url = "https://mc5g0q6ffd8sglpqt05jl03zy-h4.rest.marketingcloudapis.com/platform/v1/tokenContext";
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + fuel2token);
		
		RestTemplate restTemplate = new RestTemplate(); // 비동기 전달
		ResponseEntity<String> response = restTemplate.exchange(token_url, HttpMethod.GET, new HttpEntity<String>(headers), String.class);
		
		String result = "";
		result = response.getBody();

		return result; 
	}
	
	public String getToken(){

		String token_url = "https://mc5g0q6ffd8sglpqt05jl03zy-h4.auth.marketingcloudapis.com/v2/token";

		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();

		params.add("grant_type", "client_credentials");
		params.add("client_id", "0b3rn08w4hxwh9fo7wj0jrvs");
		params.add("client_secret", "g9ThOkGqaVvsWGjZXBt3xvgc");

		HttpEntity<MultiValueMap<String, String>> requestMessage = new HttpEntity<MultiValueMap<String, String>>(params, httpHeaders);
		RestTemplate restTemplate = new RestTemplate(); // 비동기 전달
		ResponseEntity<String> response = restTemplate.postForEntity(token_url, requestMessage, String.class);
		
		String result = "";
		result = response.getBody();

		return result; 
	}
	
	public void getInsertData(String accessToken){
		
		String api_url = "https://mc5g0q6ffd8sglpqt05jl03zy-h4.rest.marketingcloudapis.com/data/v1/async/dataextensions/key:20D8B747-5939-46B9-8E79-5D2F9247A0BE/rows";
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + accessToken);
		
	    // Body set
	    MultiValueMap<String, Object> params = new LinkedMultiValueMap<>();

	    Map<String, String> val = new HashMap<>();
	    val.put("bu_id", "534003343");
	    val.put("journey_id", "7a8b3e7d-ee64-42b7-8021-56add0a77248");
	    val.put("mkt_id", "skhan");
	    val.put("campaign_code", "B_HDQT_TS_220602_01");
	    val.put("chnl_cd", "EML_02");
	    val.put("unif_id", "jeong");
	    val.put("sfmc_id", "35105109");
	    
	    // contactkey		254	No	
	 // campaigncode		50	No	
	 // createdate	Current date		No	
	 // channel
	    
	    params.add("items", val);

		HttpEntity<MultiValueMap<String, Object>> requestMessage = new HttpEntity<MultiValueMap<String, Object>>(params, headers);
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity response = restTemplate.postForEntity(api_url, requestMessage, String.class);
				//restTemplate.exchange(api_url, HttpMethod.POST, request, InsertRowsResponse.class);
		}
	
    
//  URL url = new URL("https://mcfg0klxd9y05gglhh34vvrzg1gm.auth.marketingcloudapis.com/v2/token");
//  HttpURLConnection con = (HttpURLConnection)url.openConnection();
//  con.setRequestMethod("POST");
//  // con.setRequestProperty("X-Naver-Client-Id", searchWordVO.getClientId());//애플리케이션 클라이언트 아이디값";
//  // con.setRequestProperty("X-Naver-Client-Secret", searchWordVO.getClientSecret());//애플리케이션 클라이언트 시크릿값";
//
//  String postParams = "client_id=y27fgvzumldk3d22xfhjibud&client_secret=WuVa4pG3AJ2JBmdzDWU1Wb8c&grant_type=client_credentials";
//  con.setDoOutput(true);
//  DataOutputStream wr = new DataOutputStream(con.getOutputStream());
//  wr.writeBytes(postParams);
//  wr.flush();
//  wr.close();
//  int responseCode = con.getResponseCode();
//
//  BufferedReader br;
//  if(responseCode==200) {
//  br = new BufferedReader(new InputStreamReader(con.getInputStream()));
//  } else {
//  br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
//  }
//  String inputLine;
//  StringBuffer response = new StringBuffer();
//  while ((inputLine = br.readLine()) != null) {
//  response.append(inputLine);
//  }
//  System.out.println(response.toString());
//  br.close();
//  
//  return response.toString();
//	
}
