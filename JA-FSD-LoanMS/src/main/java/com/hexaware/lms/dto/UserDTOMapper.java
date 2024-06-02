package com.hexaware.lms.dto;

import java.io.IOException;
import java.time.LocalDate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class UserDTOMapper {
	public static UserDTO mapFromString(String json) {
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			JsonNode jsonNode = objectMapper.readTree(json);
			String firstName = jsonNode.get("firstName").asText();
			String lastName = jsonNode.get("lastName").asText();
			long phoneNumber = jsonNode.get("phoneNumber").asLong();
			String email = jsonNode.get("email").asText();
			String password = jsonNode.get("password").asText();
			LocalDate dateOfBirth = LocalDate.parse(jsonNode.get("dateOfBirth").asText());
			String gender = jsonNode.get("gender").asText();
			String fullAddress = jsonNode.get("address").asText();
			String state = jsonNode.get("state").asText();
			int creditScore = jsonNode.get("creditScore").asInt();
			String panCardNumber = jsonNode.get("panCardNumber").asText();
			int pinCode = jsonNode.get("pinCode").asInt();
			String city = jsonNode.get("city").asText();

			UserDTO userDTO = new UserDTO();
			userDTO.setFirstName(firstName);
			userDTO.setLastName(lastName);
			userDTO.setPhoneNumber(phoneNumber);
			userDTO.setEmail(email);
			userDTO.setPassword(password);
			userDTO.setDateOfBirth(dateOfBirth);
			userDTO.setGender(gender);
			userDTO.setAddress(fullAddress);
			userDTO.setState(state);
			userDTO.setCreditScore(creditScore);
			userDTO.setPanCardNumber(panCardNumber);
			userDTO.setPinCode(pinCode);
			userDTO.setCity(city);

			return userDTO;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
}
