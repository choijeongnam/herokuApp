package com.heroku.demo.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.heroku.demo.domain.AuthenticationResponse;

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
}
