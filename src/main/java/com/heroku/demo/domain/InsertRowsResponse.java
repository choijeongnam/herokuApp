package com.heroku.demo.domain;

public class InsertRowsResponse {

	private String requestId;
	private String resultMessages;
	
	public String getRequestId() {
		return requestId;
	}
	public void setRequestId(String requestId) {
		this.requestId = requestId;
	}
	public String getResultMessages() {
		return resultMessages;
	}
	public void setResultMessages(String resultMessages) {
		this.resultMessages = resultMessages;
	}
}
