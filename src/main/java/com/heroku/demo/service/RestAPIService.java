package com.heroku.demo.service;

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

import com.heroku.demo.domain.AuthenticationResponse;
import com.heroku.demo.domain.InsertRowsResponse;

@Service
@Transactional
public class RestAPIService {
	
	public AuthenticationResponse getToken() {
		
		String token_url = "https://mc5g0q6ffd8sglpqt05jl03zy-h4.auth.marketingcloudapis.com/v2/token";

		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();

		params.add("grant_type", "client_credentials");
		params.add("client_id", "xkcpey49qsmasdneeb2bd9y0");
		params.add("client_secret", "s3IN8RlOlnzbgYRVoFfxPLU4");

		// Combine Message
		HttpEntity<MultiValueMap<String, String>> requestMessage = new HttpEntity<MultiValueMap<String, String>>(params, httpHeaders);

		// ResponseEntity<String> result = restTemplate.exchange(token_url,
		// HttpMethod.POST, requestMessage, String.class);
		RestTemplate restTemplate = new RestTemplate(); // 비동기 전달
		ResponseEntity response = restTemplate.postForEntity(token_url, requestMessage, String.class);
		
		return (AuthenticationResponse) response.getBody();
	}
	
	public InsertRowsResponse getInsertData(String accessToken){
		
		String api_url = "https://mc5g0q6ffd8sglpqt05jl03zy-h4.rest.marketingcloudapis.com/data/v1/async/dataextensions/key:5AB4E2EF-4C4D-430C-90B3-71AF493A7A1D/rows";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + accessToken);
		
	      // Body set
	      MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
	      body.add("bu_id", "534003343");
	      body.add("journey_id", "7a8b3e7d-ee64-42b7-8021-56add0a77248");
	      body.add("mkt_id", "skhan");
	      body.add("mkt_dept_cd", "dk");
	      body.add("campaign_code", "B_HDQT_TS_220602_01");
	      body.add("chnl_cd", "EML_02");
	      body.add("unif_id", "jeong");
	      body.add("sfmc_id", "35105109");

		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(body, headers);
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity InsertData = restTemplate.exchange(api_url, HttpMethod.POST, request, InsertRowsResponse.class);
		
		return (InsertRowsResponse) InsertData.getBody();
		}
}
