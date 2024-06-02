package com.hexaware.lms.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public class LoginDTO {
	@Email(message = "Invalid email format")
	private String username;

	@Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters")
	private String password;

	public LoginDTO() {
		super();
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
