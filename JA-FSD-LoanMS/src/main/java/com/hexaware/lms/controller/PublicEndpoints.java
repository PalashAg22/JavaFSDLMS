package com.hexaware.lms.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hexaware.lms.dto.LoginDTO;
import com.hexaware.lms.dto.UserDTO;
import com.hexaware.lms.dto.UserDTOMapper;
import com.hexaware.lms.entities.LoanType;
import com.hexaware.lms.entities.LoginResponse;
import com.hexaware.lms.exception.DataAlreadyPresentException;
import com.hexaware.lms.exception.LoginCredentialsNotFound;
import com.hexaware.lms.service.IAdminService;
import com.hexaware.lms.service.ICustomerService;
import com.hexaware.lms.service.ILoanService;
import com.hexaware.lms.service.ILoanTypeService;

import jakarta.validation.Valid;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api")
public class PublicEndpoints {
		
	@Autowired ILoanService loanService;
	
	@Autowired ILoanTypeService loanTypeService;
	
	@Autowired IAdminService adminService;
	
	@Autowired ICustomerService custService;
	
	Logger log= LoggerFactory.getLogger(PublicEndpoints.class);

	@PostMapping(value="/customer/register", consumes="multipart/form-data")
	public ResponseEntity<Map<String,String>> registerCustomer(@RequestParam("register") String userDTO,@RequestParam("file") MultipartFile file) {
	    log.info("Request Received to register new Customer: " + userDTO);
	    UserDTO userDto= UserDTOMapper.mapFromString(userDTO);
	    Map<String,String> response = new HashMap<>();
	    String responseString="";
	    try {
	    	if(custService.register(userDto, file)) {
	    		responseString="Successfully Registered";
	    	}
			response.put("Registration Process: ",responseString);
			return ResponseEntity.ok().body(response);
		} catch (DataAlreadyPresentException | IOException e) {
			responseString="Some exceptions has occurred";
			e.printStackTrace();
		}
	    response.put("Couldn't register", responseString);
	    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> authenticateAndGetTokenForCustomer(@RequestBody @Valid  LoginDTO loginDto) throws LoginCredentialsNotFound {
		log.info("Request received to login: [Username:" + loginDto.getUsername() + ", Password: "
				+ loginDto.getPassword()+" ]");
		return ResponseEntity.ok().body(custService.login(loginDto.getUsername(), loginDto.getPassword()));
	}
	
	@GetMapping("/checkEMI/{principal}/{rate}/{tenure}")
	public ResponseEntity<Double> calculateEMI(@PathVariable(name="principal") double principal, @PathVariable(name= "rate") double rate, @PathVariable(name="tenure") int tenure) {
		log.info("Calculating EMI for principal: "+principal+", rate: "+rate+", tenure: "+tenure);
		return ResponseEntity.ok().body(loanService.emiCalculator(principal, rate, tenure));
	}

	@GetMapping("/dashboard")
	public ResponseEntity<List<LoanType>> viewAllAvailableLoans() {
		log.info("Customer is logged In");
		return ResponseEntity.ok().body(loanTypeService.viewAvailableLoanType());
	}

}
