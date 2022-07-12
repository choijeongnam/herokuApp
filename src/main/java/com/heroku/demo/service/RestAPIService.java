package com.heroku.demo.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
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
	
	@Autowired 
	RestAPIService restAPIService;
	
	public String getMid(String fuel2token){
		
		String token_url = "https://mc5g0q6ffd8sglpqt05jl03zy-h4.rest.marketingcloudapis.com/platform/v1/tokenContext";
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + fuel2token);
		
		RestTemplate restTemplate = new RestTemplate(); // 비동기 전달
		ResponseEntity<String> response = restTemplate.exchange(token_url, HttpMethod.GET, new HttpEntity<String>(headers), String.class);
		
//		String result = "";
//		result = response.getBody(); 이거 수정

		return response.getBody(); 
	}
	
	public String getToken(){
		//Access Token for Server-to-Server Integrations
		//https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/access-token-s2s.html
		
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
	
	public void getInsertData(String accessToken, String rs) throws ParseException{
		
		String api_url = "https://mc5g0q6ffd8sglpqt05jl03zy-h4.rest.marketingcloudapis.com/data/v1/async/dataextensions/key:MC_SEND_JOUR_H/rows";
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + accessToken);
		
	    // Body set
	    MultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
	    
	    Map<String, String> insertData = new HashMap<>();
	    
	    JSONParser parser = new JSONParser();
	    JSONObject sbJson = (JSONObject) parser.parse(rs);
	    
	    JSONArray dataArr = (JSONArray) sbJson.get("inArguments");
	    JSONObject data = (JSONObject) dataArr.get(0);
	    JSONObject fields = (JSONObject) data.get("fields");
	    
	    insertData.put("journey_id", data.get("journey_id").toString());
	    //insertData.put("version_id", data.get("version_id").toString());
	    insertData.put("chnl_cd", data.get("chnl_cd").toString());
	    insertData.put("sfmc_id", data.get("sfmc_id").toString());
	    
	    if(data.get("campaign_code").toString() == null && data.get("campaign_code").toString() == "") {
	    	insertData.put("campaign_code", fields.get("campaign_code").toString());
	    } else {
	    	insertData.put("campaign_code", data.get("campaign_code").toString());
	    }
	    
	    if(data.get("mkt_id").toString() == null && data.get("mkt_id").toString() == "") {
	    	insertData.put("mkt_id", fields.get("mkt_id").toString());
	    } else {
	    	insertData.put("mkt_id", data.get("mkt_id").toString());
	    }
	    
	    System.err.println(fields.get("segment_id").toString());
	    if(fields.get("segment_id").toString() == null && fields.get("segment_id").toString() == "") {
	    	insertData.put("segment_id", "1");
	    } else {
		    insertData.put("segment_id", fields.get("segment_id").toString());
	    }
	    
	    if(data.containsKey("version_id") == true) {
	    	if(data.get("version_id").toString() != "" && data.get("version_id").toString() != null) {
		    	insertData.put("version_id", data.get("version_id").toString());
	    	}
	    }
	    
	    if(data.containsKey("activity_key") == true) {
	    	if(data.get("activity_key").toString() != "" && data.get("activity_key").toString() != null) {
		    	insertData.put("activity_key", data.get("activity_key").toString());
	    	}
	    }
	    
	    if(data.containsKey("activity_type") == true) {
	    	if(data.get("activity_type").toString() != "" && data.get("activity_type").toString() != null) {
		    	insertData.put("activity_type", data.get("activity_type").toString());
	    	}
	    }

	    insertData.put("unif_id", fields.get("unif_id").toString());
	    //insertData.put("mkt_dept_cd", fields.get("mkt_dept_cd").toString()); 나중에 추가하던지 뺴던지
	    
	    params.add("items", insertData);

		HttpEntity<MultiValueMap<String, Object>> requestMessage = new HttpEntity<MultiValueMap<String, Object>>(params, headers);
		RestTemplate restTemplate = new RestTemplate();
		//ResponseEntity response = 
		restTemplate.postForEntity(api_url, requestMessage, String.class);
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
