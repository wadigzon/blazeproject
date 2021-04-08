package com.blaze.project;


import com.fasterxml.jackson.annotation.JsonProperty;
import io.dropwizard.Configuration;

public class ProjectConfiguration extends Configuration {
	@JsonProperty
	private String userName;

	@JsonProperty
	private String password;
	
	@JsonProperty
	private String host;
	
	@JsonProperty
	private String database;
	
	@JsonProperty
	private String collection;
	
	public String getUserName() {
		return userName;
	}
	
	public String getPassword() {
		return password;
	}
	
	public String getHost() {
		return host;
	}
	
	public String getDatabase() { 
		return database;
	}
	
	public String getCollection() {
		return collection;
	}
}
