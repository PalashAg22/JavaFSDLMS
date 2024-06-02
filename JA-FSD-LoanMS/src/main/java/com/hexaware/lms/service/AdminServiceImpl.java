package com.hexaware.lms.service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hexaware.lms.dto.AdminDTO;
import com.hexaware.lms.dto.UploadHelper;
import com.hexaware.lms.dto.UserDTO;
import com.hexaware.lms.entities.Roles;
import com.hexaware.lms.entities.User;
import com.hexaware.lms.exception.DataAlreadyPresentException;
import com.hexaware.lms.repository.UserRepository;

@Service
public class AdminServiceImpl implements IAdminService {

	Logger logger = LoggerFactory.getLogger(AdminServiceImpl.class);

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private UserRepository repo;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	public AdminServiceImpl(AuthenticationManager authenticationManager, JwtService jwtService, UserRepository repo) {
		super();
		this.authenticationManager = authenticationManager;
		this.jwtService = jwtService;
		this.repo = repo;
	}

	@Override
	public boolean register(AdminDTO adminDto) throws DataAlreadyPresentException {
//		User adminByPhone = getAdminByPhoneNumber(adminDto.getPhoneNumber());
		User adminByEmail = getAdminByEmail(adminDto.getEmail());
		if ((adminByEmail != null)) {
			logger.warn("User is trying to enter DUPLICATE data while registering");
			throw new DataAlreadyPresentException("Email already taken...Trying Logging in..!");
		}
		User admin= new User();
		Roles role = Roles.ADMIN;
		admin.setFirstName(adminDto.getFirstName());
		admin.setLastName(adminDto.getLastName());
		admin.setEmail(adminDto.getEmail());
		admin.setPassword(new BCryptPasswordEncoder().encode(adminDto.getPassword()));
		admin.setRole(role.getRoleName());
//		LocalDate dob = adminDto.getDateOfBirth();
//		admin.setDateOfBirth(dob);
//		LocalDate now = LocalDate.now();
//		Period period = Period.between(dob, now);
//		int age = period.getYears();		
//		admin.setAge(age);
//		admin.setGender(adminDto.getGender());
//		admin.setAddress(adminDto.getAddress());
//		admin.setState(adminDto.getState());
//		admin.setPinCode(adminDto.getPinCode());
//		admin.setCity(adminDto.getCity());
//		admin.setCreditScore(adminDto.getCreditScore());
//		admin.setPanCardNumber(adminDto.getPanCardNumber());
		User savedAdmin = repo.save(admin);
		logger.info("Admin Created: " + savedAdmin);
		return true;
	}
	
	public User getAdminByPhoneNumber(long phoneNumber) {
		logger.info("Finding " + phoneNumber + " in database...");
		return repo.findByPhoneNumber(phoneNumber);
	}

	public User getAdminByEmail(String email) {
		logger.info("Finding " + email + " in database");
		return repo.findByEmail(email).orElse(null);
	}

	@Override
	public boolean updateAccount(UserDTO adminDto) throws DataAlreadyPresentException {
		User admin = repo.findById(adminDto.getUserId()).orElse(null);
		admin.setAddress(adminDto.getAddress());
		admin.setCreditScore(adminDto.getCreditScore());
		admin.setFirstName(adminDto.getFirstName());
		admin.setLastName(adminDto.getLastName());
		admin.setDateOfBirth(adminDto.getDateOfBirth());
		LocalDate currentDate = LocalDate.now();
		Period period = Period.between(adminDto.getDateOfBirth(), currentDate);
		int age = period.getYears();
		admin.setAge(age);
		admin.setEmail(adminDto.getEmail());
		admin.setGender(adminDto.getGender());
		admin.setPassword(passwordEncoder.encode(adminDto.getPassword()));
		admin.setPhoneNumber(adminDto.getPhoneNumber());
		admin.setPinCode(adminDto.getPinCode());
		admin.setCity(adminDto.getCity());
		admin.setState(adminDto.getState());
		User customerByPhone = getAdminByPhoneNumber(adminDto.getPhoneNumber(),adminDto.getUserId());
		User customerByEmail = getAdminByEmail(adminDto.getEmail(),adminDto.getUserId());
		if ((customerByPhone != null || customerByEmail != null)) {
			logger.warn("User is trying to enter DUPLICATE data while registering");
			throw new DataAlreadyPresentException("PhoneNumber or Email already taken...Trying Logging in..!");
		}
		repo.save(admin);
		return true;		
	}

	private User getAdminByEmail(String email, long userId) {
		logger.info("Finding " + email + " in database...");
		return repo.findByEmail(email,userId).orElse(null);
	}

	private User getAdminByPhoneNumber(long phoneNumber, long userId) {
		logger.info("Finding " + phoneNumber + " in database...");
		return repo.findByPhoneNumber(phoneNumber,userId).orElse(null);
	}

	@Override
	public List<User> getAllAdmins() {
		return repo.findAdmins("ADMIN");
	}
	@Override
	public byte[] downloadImageBytes(long userId) {
		logger.info("Querying Database to get file bytes for the user...");
		Optional<User> user = repo.findById(userId);
		if(user.isPresent()) {
			logger.info("User is found with the userId: "+userId);
			logger.info("File Data: "+user.get().getIdProofFile());
			return UploadHelper.decompressImage(user.get().getIdProofFile());
		}
		logger.info("No user found with the userId "+userId);
		logger.info("Returning empty byte[].");
		return new byte[0];
	}

}
