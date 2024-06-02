package com.hexaware.lms.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hexaware.lms.dto.UploadHelper;
import com.hexaware.lms.dto.UserDTO;
import com.hexaware.lms.entities.LoginResponse;
import com.hexaware.lms.entities.Roles;
import com.hexaware.lms.entities.User;
import com.hexaware.lms.exception.CustomerNotFoundException;
import com.hexaware.lms.exception.DataAlreadyPresentException;
import com.hexaware.lms.exception.LoginCredentialsNotFound;
import com.hexaware.lms.repository.UserRepository;

@Service
public class CustomerServiceImpl implements ICustomerService {


	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	JwtService jwtService;

	@Autowired
	UserRepository repo;

	Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);

	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public LoginResponse login(String username, String password) throws LoginCredentialsNotFound {
		logger.info("Someone is logging in...");
		LoginResponse response = new LoginResponse();
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		logger.warn("Authentication run Successfully...");
		if (authentication.isAuthenticated()) {
			logger.info("Aauthenticated...");
			String token = jwtService.generateToken(username);
			User user = getCustomerByEmail(username);
			response.setJwtToken(token);
			response.setUser(user);
			if (token != null) {
				logger.info("Token for User: " + token);
			} else {
				logger.warn("Token not generated");
			}
		} else {
			logger.error("Authentication Failed");
			throw new LoginCredentialsNotFound("Credentials not found");
		}
		return response;
	}

	@Override
	public boolean register(UserDTO customerDTO, MultipartFile file)
			throws DataAlreadyPresentException, IOException {
		logger.info("New Registration Request for: "+customerDTO);
		Roles role = Roles.USER;
		User customerByPhone = getCustomerByPhoneNumber(customerDTO.getPhoneNumber());
		User customerByEmail = getCustomerByEmail(customerDTO.getEmail());
		if ((customerByPhone != null || customerByEmail != null)) {
			logger.warn("User is trying to enter DUPLICATE data while registering");
			throw new DataAlreadyPresentException("PhoneNumber or Email already taken...Trying Logging in..!");
		}
		User user = new User();
		user.setFirstName(customerDTO.getFirstName());
		user.setLastName(customerDTO.getLastName());
		user.setEmail(customerDTO.getEmail());
		user.setPhoneNumber(customerDTO.getPhoneNumber());
		user.setPassword(passwordEncoder.encode(customerDTO.getPassword()));
		LocalDate dob = customerDTO.getDateOfBirth();
		user.setDateOfBirth(dob);
		LocalDate now = LocalDate.now();
		Period period = Period.between(dob, now);
		int age = period.getYears();		
		user.setAge(age);
		user.setGender(customerDTO.getGender());
		user.setAddress(customerDTO.getAddress());
		user.setState(customerDTO.getState());
		user.setCreditScore(customerDTO.getCreditScore());
		user.setPanCardNumber(customerDTO.getPanCardNumber());
		user.setPinCode(customerDTO.getPinCode());
		user.setCity(customerDTO.getCity());
		user.setRole(role.getRoleName());
		byte[] fileData = null;
		try {
			fileData = file.getBytes();
			byte[] compressedFileData = UploadHelper.compressImage(fileData);
			user.setIdProofFile(compressedFileData);
		} catch (IOException e) {
			e.printStackTrace();
		}
		user.setFileName(file.getOriginalFilename());
		logger.info("Registering User: " + user);
		User addedCustomer = repo.save(user);
		logger.info("Registerd Customer: " + addedCustomer);
		return true;
	}

	@Override
	public List<User> viewAllCustomers() {
		logger.info("Viewing all Customers");
		return repo.findCustomers("USER");
	}

	@Override
	public User viewCustomerDetailsById(long customerId) throws CustomerNotFoundException {
		Stream<User> stream = repo.findAll().stream();
		User isPresent = stream.filter(customers -> customers.getUserId()==customerId).findAny().orElse(null);
		if (isPresent==null) {
			logger.warn("No customer found re...");
			throw new CustomerNotFoundException("No Customer found with id: " + customerId);
		}
		return repo.findById(customerId).orElse(null);
	}

	@Override
	public User getCustomerByPhoneNumber(long phoneNumber) {
		logger.info("Finding " + phoneNumber + " in database...");
		return repo.findByPhoneNumber(phoneNumber);
	}

	@Override
	public User getCustomerByEmail(String email) {
		logger.info("Finding " + email + " in database");
		return repo.findByEmail(email).orElse(null);
	}

	@Override
	public User updateCustomerAccount(UserDTO userDto) throws DataAlreadyPresentException {
		User customer = repo.findById(userDto.getUserId()).orElse(null);
		customer.setAddress(userDto.getAddress());
		customer.setCreditScore(userDto.getCreditScore());
		customer.setFirstName(userDto.getFirstName());
		customer.setLastName(userDto.getLastName());
		customer.setDateOfBirth(customer.getDateOfBirth());
		LocalDate currentDate = LocalDate.now();
		Period period = Period.between(customer.getDateOfBirth(), currentDate);
		int age = period.getYears();
		customer.setAge(age);
		customer.setEmail(userDto.getEmail());
		customer.setGender(userDto.getGender());
		customer.setPassword(passwordEncoder.encode(userDto.getPassword()));
		customer.setPhoneNumber(userDto.getPhoneNumber());
		customer.setPinCode(userDto.getPinCode());
		customer.setCity(userDto.getCity());
		customer.setState(userDto.getState());
		User customerByPhone = getCustomerByPhoneNumber(userDto.getPhoneNumber(),userDto.getUserId());
		User customerByEmail = getCustomerByEmail(userDto.getEmail(),userDto.getUserId());
		if ((customerByPhone != null || customerByEmail != null)) {
			logger.warn("User is trying to enter DUPLICATE data while registering");
			throw new DataAlreadyPresentException("PhoneNumber or Email already taken...Trying Logging in..!");
		}
		return repo.save(customer);
	}
	private User getCustomerByEmail(String email, long userId) {
		logger.info("Finding " + email + " in database...");
		return repo.findByEmail(email,userId).orElse(null);
	}

	private User getCustomerByPhoneNumber(long phoneNumber, long userId) {
		logger.info("Finding " + phoneNumber + " in database...");
		return repo.findByPhoneNumber(phoneNumber,userId).orElse(null);
	}

}
