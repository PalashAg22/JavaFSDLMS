package com.hexaware.lms.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.hexaware.lms.dto.UserDTO;
import com.hexaware.lms.entities.User;
import com.hexaware.lms.entities.LoginResponse;
import com.hexaware.lms.exception.CustomerNotFoundException;
import com.hexaware.lms.exception.DataAlreadyPresentException;
import com.hexaware.lms.exception.LoginCredentialsNotFound;

public interface ICustomerService {
	LoginResponse login(String username, String password) throws LoginCredentialsNotFound;

	List<User> viewAllCustomers();

	User viewCustomerDetailsById(long customerId) throws CustomerNotFoundException;

	User getCustomerByPhoneNumber(long phoneNumber);

	User getCustomerByEmail(String email);

	boolean register(UserDTO customerDTO, MultipartFile file) throws DataAlreadyPresentException, IOException;

	User updateCustomerAccount(UserDTO userDto) throws DataAlreadyPresentException;
}
