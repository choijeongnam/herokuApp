package com.heroku.demo.service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

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
import com.heroku.demo.domain.InsertRowsResponse;

@Service
@Transactional
public class RestAPIService {
	
	public String getToken() throws IOException{
        
        URL url = new URL("https://mcfg0klxd9y05gglhh34vvrzg1gm.auth.marketingcloudapis.com/v2/token");
        HttpURLConnection con = (HttpURLConnection)url.openConnection();
        con.setRequestMethod("POST");
        // con.setRequestProperty("X-Naver-Client-Id", searchWordVO.getClientId());//애플리케이션 클라이언트 아이디값";
        // con.setRequestProperty("X-Naver-Client-Secret", searchWordVO.getClientSecret());//애플리케이션 클라이언트 시크릿값";

        String postParams = "client_id=y27fgvzumldk3d22xfhjibud&client_secret=WuVa4pG3AJ2JBmdzDWU1Wb8c&grant_type=client_credentials";
        con.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(postParams);
        wr.flush();
        wr.close();
        int responseCode = con.getResponseCode();

        BufferedReader br;
        if(responseCode==200) {
        br = new BufferedReader(new InputStreamReader(con.getInputStream()));
        } else {
        br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
        }
        String inputLine;
        StringBuffer response = new StringBuffer();
        while ((inputLine = br.readLine()) != null) {
        response.append(inputLine);
        }
        System.out.println(response.toString());
        br.close();
        
        return response.toString();
		
//		String token_url = "https://mc5g0q6ffd8sglpqt05jl03zy-h4.auth.marketingcloudapis.com/v2/token";
//
//		HttpHeaders httpHeaders = new HttpHeaders();
//		httpHeaders.setContentType(MediaType.APPLICATION_JSON);
//
//		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//
//		params.add("grant_type", "client_credentials");
//		params.add("client_id", "4nsk18zql89utm3unq24v78n");
//		params.add("client_secret", "FvQIUx9QJnWjy1gyxUGCb7BC");
//
//		HttpEntity<MultiValueMap<String, String>> requestMessage = new HttpEntity<MultiValueMap<String, String>>(params, httpHeaders);
//		RestTemplate restTemplate = new RestTemplate(); // 비동기 전달
//		ResponseEntity response = restTemplate.postForEntity(token_url, requestMessage, String.class);
//		
//		return (AuthenticationResponse) response.getBody();
	}
	
	public InsertRowsResponse getInsertData(String accessToken){
		
		String api_url = "https://mc5g0q6ffd8sglpqt05jl03zy-h4.rest.marketingcloudapis.com/data/v1/async/dataextensions/key:5AB4E2EF-4C4D-430C-90B3-71AF493A7A1D/rows";
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + accessToken);
		
	    // Body set
	    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
	    params.add("bu_id", "534003343");
	    params.add("journey_id", "7a8b3e7d-ee64-42b7-8021-56add0a77248");
	    params.add("mkt_id", "skhan");
	    params.add("mkt_dept_cd", "dk");
	    params.add("campaign_code", "B_HDQT_TS_220602_01");
	    params.add("chnl_cd", "EML_02");
	    params.add("unif_id", "jeong");
	    params.add("sfmc_id", "35105109");

		HttpEntity<MultiValueMap<String, String>> requestMessage = new HttpEntity<MultiValueMap<String, String>>(params, headers);
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity response = restTemplate.postForEntity(api_url, requestMessage, InsertRowsResponse.class);
				//restTemplate.exchange(api_url, HttpMethod.POST, request, InsertRowsResponse.class);
		
		return (InsertRowsResponse) response.getBody();
		}
}
