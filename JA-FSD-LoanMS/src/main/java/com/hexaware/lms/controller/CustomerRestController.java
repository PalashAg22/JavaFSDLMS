package com.hexaware.lms.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hexaware.lms.dto.UserDTO;
import com.hexaware.lms.dto.LoanApplicationRequestDTO;
import com.hexaware.lms.dto.LoanApplicationRequestDTOMapper;
import com.hexaware.lms.entities.User;
import com.hexaware.lms.entities.LoanApplication;
import com.hexaware.lms.entities.LoanType;
import com.hexaware.lms.exception.CustomerNotEligibleException;
import com.hexaware.lms.exception.CustomerNotFoundException;
import com.hexaware.lms.exception.DataAlreadyPresentException;
import com.hexaware.lms.exception.LoanNotFoundException;
import com.hexaware.lms.exception.PropertyAlreadyExistException;
import com.hexaware.lms.repository.LoanTypeRepository;
import com.hexaware.lms.service.ICustomerService;
import com.hexaware.lms.service.ILoanService;
import com.hexaware.lms.service.ILoanTypeService;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/customer")
@PreAuthorize("hasAuthority('USER')")
public class CustomerRestController {

	Logger log = LoggerFactory.getLogger(CustomerRestController.class);

	@Autowired
	private ILoanService loanService;

	@Autowired
	private ILoanTypeService loanTypeService;

	@Autowired
	private ICustomerService custService;

	@Autowired
	private LoanTypeRepository loanTypeRepo;

	@Autowired
	PasswordEncoder passwordEncoder;
	
	@PostMapping(value = "/loan-application/applyLoan", consumes = "multipart/form-data")
	public ResponseEntity<Boolean> applyLoan(@RequestPart("loanRequest") @Valid String loanRequest,
			@RequestPart("file") MultipartFile file)
			throws PropertyAlreadyExistException, IOException, CustomerNotEligibleException, MessagingException {
		LoanApplicationRequestDTO requestDTO = LoanApplicationRequestDTOMapper.mapFromString(loanRequest);
		LoanApplication loanApplication = loanService.applyLoan(requestDTO.getLoanApplicationDto(),
				requestDTO.getPropertyDto(), file);
		return new ResponseEntity(loanApplication, HttpStatus.OK);
	}
	
	@PostMapping(value="/update-loan", consumes="multipart/form-data")
	public ResponseEntity<Boolean> updateLoan(@RequestPart("loanRequest") @Valid String loanRequest,
			@RequestPart("file") MultipartFile file) throws PropertyAlreadyExistException, IOException {
		log.info("sending request for update loan application");
		LoanApplicationRequestDTO requestDTO = LoanApplicationRequestDTOMapper.mapFromString(loanRequest);
		LoanApplication loanApplication = loanService.updateLoan(requestDTO.getLoanApplicationDto(),
				requestDTO.getPropertyDto(), file);
		return new ResponseEntity(loanApplication, HttpStatus.OK);
	}
	
	@GetMapping("/cancel-applied-loan/{loanId}")
	public ResponseEntity<Boolean> cancelAppliedLoan(@PathVariable  long loanId) {
		log.info(""+loanId);
		return new ResponseEntity(loanService.customerUpdateLoanStatus(loanId, "CANCELLED"), HttpStatus.ACCEPTED);
	}

	@GetMapping("/dashboard")
	public ResponseEntity<List<LoanType>> viewAllAvailableLoans() {
		log.info("Customer is logged In");
		return new ResponseEntity(loanTypeService.viewAvailableLoanType(), HttpStatus.OK);
	}

	@GetMapping("/searchLoanById/{customerId}/{loanId}")
	public ResponseEntity<LoanApplication> searchLoanById(@PathVariable long customerId, @PathVariable long loanId)
			throws LoanNotFoundException {
		log.info("Request Received to search loan of Customer: " + customerId);
		return new ResponseEntity(loanService.searchAppliedLoan(customerId, loanId), HttpStatus.OK);
	}

	@GetMapping("/viewAllAppliedLoans/{customerId}")
	public ResponseEntity<List<LoanApplication>> viewAllAppliedLoans(@PathVariable long customerId) {
		log.info("Request Received to view all loans of Customer: " + customerId);
		return new ResponseEntity(loanService.allAppliedLoansOfCustomer(customerId), HttpStatus.OK);
	}

	@GetMapping("/viewAllAppliedLoansByStatus/{status}/{customerId}")
	public ResponseEntity<List<LoanApplication>> filterAppliedLoanByStatus(@PathVariable long customerId, @PathVariable String status)
			throws LoanNotFoundException {
		log.info("Request Received to view loans by Status: " + status);
		return new ResponseEntity(loanService.filterAppliedLoanByStatus(customerId, status), HttpStatus.OK);
	}

	@GetMapping("/viewAllAppliedLoansByType/{loanType}/{customerId}")
	public ResponseEntity<List<LoanApplication>> filterAppliedLoanByType(@PathVariable long customerId, @PathVariable String loanType)
			throws LoanNotFoundException {
		log.info("Request Received to view loan by loanType: " + loanType);
		return new ResponseEntity(loanService.filterAppliedLoanByType(customerId, loanType), HttpStatus.OK);
	}

	@GetMapping("/calculateInterest/{loanId}/{customerId}")
	public ResponseEntity<Double> calculateInterest(@PathVariable(name = "loanId") long loanId,
			@PathVariable(name = "customerId") long customerId) {
		log.info("Calculating Interest of loanId: " + loanId + " for customer: " + customerId);
		return new ResponseEntity(loanService.interestCalculator(loanId, customerId), HttpStatus.OK);
	}

	@GetMapping("/calculateEMI/{loanId}/{customerId}")
	public ResponseEntity<Double> calculateEMI(@PathVariable(name = "loanId") long loanId,
			@PathVariable(name = "customerId") long customerId) {
		log.info("Calculating Interest of loanId: " + loanId + " for customer: " + customerId);
		return new ResponseEntity(loanService.emiCalculator(loanId, customerId), HttpStatus.OK);
	}
	@GetMapping("/calculateEMI/{loanAmount}/{loanDuration}/{loanType}")
	public ResponseEntity<Double> calculateEMI(@PathVariable double loanAmount, @PathVariable int loanDuration,
			@PathVariable String loanType) {
		log.info(loanAmount + "  " + loanDuration + "    " + loanType);
		LoanType loanObj = loanTypeRepo.findAllByLoanTypeName(loanType);
		double interest = loanObj.getLoanInterestBaseRate();
		return new ResponseEntity(loanService.emiCalculator(loanAmount, interest, loanDuration), HttpStatus.OK);
	}

	@GetMapping("/dashboard/{loanType}")
	public ResponseEntity<LoanType> filterDashboardLoans(@PathVariable String loanType) throws LoanNotFoundException {
		log.info("Request Received filter DashBoard Loans by type");
		return new ResponseEntity(loanTypeService.searchDashboardLoansToApply(loanType),HttpStatus.OK);
	}

	@PutMapping("/updateAccount")
	public ResponseEntity<User> updateAccountDetails(@RequestBody UserDTO userDto) throws CustomerNotFoundException, DataAlreadyPresentException {
		return new ResponseEntity(custService.updateCustomerAccount(userDto), HttpStatus.OK);
	}

	@ExceptionHandler({ PropertyAlreadyExistException.class })
	public ResponseEntity<String> handlePropertyException(PropertyAlreadyExistException e) {
		log.warn("Some Exception has occurred");
		return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler({ CustomerNotEligibleException.class })
	public ResponseEntity<String> handleEligibilityException(CustomerNotEligibleException e) {
		log.warn("Customer is not eligible to apply for a loan but he is eager to.");
		return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
	}

}
