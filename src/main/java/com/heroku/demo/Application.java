/*
 * Copyright 2015 Benedikt Ritter
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.heroku.demo;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) throws IOException{
        SpringApplication.run(Application.class, args);
        
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
        }
    }