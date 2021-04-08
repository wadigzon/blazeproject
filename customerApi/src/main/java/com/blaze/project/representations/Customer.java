package com.blaze.project.representations;

public class Customer {
	// private final int id;
	private final String firstName;
	private final String lastName;
	private final String email;
	private final String phoneNumber;
	
	public Customer() {
		//this.id = 0;
		this.firstName = null;
		this.lastName = null;
		this.email = null;
		this.phoneNumber = null;
	}
	
	public Customer(int id, String firstName, String lastName, String phoneNumber, String email) {
		// this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.email = email;
	}
	
	/*
	public int getId() {
		return id;
	}
	*/
	public String getFirstName() {
		return firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public String getEmail() {
		return email;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
}
