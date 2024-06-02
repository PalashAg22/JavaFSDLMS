package com.hexaware.lms.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class UserDTO {
	
	@Min(value=1001 ,message="It is auto-generated but starts from 1001")
	private long userId;
	
	private String profileImage;

	@Size(min = 3, max = 20, message = "First name must be between 3 and 20 characters")
	private String firstName;

	@Size(min = 3, max = 20, message = "Last name must be between 3 and 20 characters")
	private String lastName;


	@Positive(message = "Phone number must be a positive number")
	@Digits(integer = 10, fraction = 0, message = "Phone number must be a 10-digit number")
	private long phoneNumber;

	@Email(message = "Invalid email format")
	private String email;

	@Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters")
	private String password;


	@Past(message = "You must be 18+ years old")
	private LocalDate dateOfBirth;
	
	private String gender;

	@Size(max = 100, message = "Address must be less than or equal to 100 characters")
	private String address;
	
	@Size(min=3,message="City name must be longer than 3 characters")
	private String city;
	
	@Positive(message="PINCODE must be positive")
	@Digits(integer=6,fraction=0,message="PINCODE must be 6-digits long")
	private int pinCode;
	
	@NotBlank(message = "State cannot be blank")
	private String state;

	@Min(value = 0, message = "Credit score must be +ve")
	@Max(value = 900, message = "Credit score cannot be more than 900")
	private int creditScore;

	@Pattern(regexp = "[A-Z]{5}\\d{4}[A-Z]")
	private String panCardNumber;

	public UserDTO() {
		super();
	}

	public String getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public int getPinCode() {
		return pinCode;
	}

	public void setPinCode(int pinCode) {
		this.pinCode = pinCode;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public long getPhoneNumber() {
		return phoneNumber;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public void setPhoneNumber(long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public int getCreditScore() {
		return creditScore;
	}

	public void setCreditScore(int creditScore) {
		this.creditScore = creditScore;
	}

	public String getPanCardNumber() {
		return panCardNumber;
	}

	public void setPanCardNumber(String panCardNumber) {
		this.panCardNumber = panCardNumber;
	}
}
