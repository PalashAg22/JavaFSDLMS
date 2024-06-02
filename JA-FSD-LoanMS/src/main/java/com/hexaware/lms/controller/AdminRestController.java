package com.hexaware.lms.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.lms.dto.AdminDTO;
import com.hexaware.lms.dto.LoanTypeDTO;
import com.hexaware.lms.dto.UserDTO;
import com.hexaware.lms.entities.LoanApplication;
import com.hexaware.lms.entities.LoanType;
import com.hexaware.lms.entities.PropertyInfo;
import com.hexaware.lms.entities.User;
import com.hexaware.lms.exception.CustomerNotFoundException;
import com.hexaware.lms.exception.DataAlreadyPresentException;
import com.hexaware.lms.exception.LoanNotFoundException;
import com.hexaware.lms.exception.LoanTypeAlreadyExistException;
import com.hexaware.lms.service.IAdminService;
import com.hexaware.lms.service.ICustomerService;
import com.hexaware.lms.service.ILoanService;
import com.hexaware.lms.service.ILoanTypeService;
import com.hexaware.lms.service.IPropertyService;
import com.hexaware.lms.service.IUploadPropertyService;

//import com.hexaware.lms.service.UploadIdProofService;
import jakarta.validation.Valid;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminRestController {

	Logger log = LoggerFactory.getLogger(AdminRestController.class);

	@Autowired
	private IAdminService adminService;

	@Autowired
	private ILoanTypeService loanTypeService;

	@Autowired
	private ILoanService loanService;

	@Autowired
	private ICustomerService custService;

	@Autowired
	private IUploadPropertyService uploadService;
	
	@Autowired
	private IPropertyService propService;

	@GetMapping("/getAllAdmins")
	public ResponseEntity<List<User>> getAllAdmins(){
		log.info("Querying database to get all admins.");
		return ResponseEntity.ok().body(adminService.getAllAdmins());
	}
	
	@PutMapping("/update-account")
	public ResponseEntity<Boolean> updateAccountDetails(@RequestBody @Valid UserDTO adminDto) throws DataAlreadyPresentException {
		log.info("Admin is trying to update his account details.");
		return ResponseEntity.ok().body(adminService.updateAccount(adminDto));
	}
	
	@PostMapping("/createLoanType")
	public ResponseEntity<LoanType> createNewLoanType(@RequestBody @Valid LoanTypeDTO loanTypeDto) throws LoanTypeAlreadyExistException {
		log.info("Request received to create a new loanType: " + loanTypeDto);
		return ResponseEntity.ok().body(loanTypeService.createLoanType(loanTypeDto));
	}

	@PostMapping("/createNewAdmin")
	public ResponseEntity<Boolean> createNewAdmin(@RequestBody @Valid AdminDTO adminDto) throws DataAlreadyPresentException {
		log.info("Request received to create new Admin: " + adminDto);
		return ResponseEntity.ok().body(adminService.register(adminDto));
	}

	@PutMapping("/update-customer-loan-status/{loanId}/{status}")
	public ResponseEntity<Boolean> updateLoanStatus(@PathVariable long loanId, @PathVariable String status) {
		log.info("Request received to update Loan Status to: " + status +" for loanNo: " + loanId);
		return ResponseEntity.ok().body(loanService.customerUpdateLoanStatus(loanId, status));
	}

	@GetMapping(value = "/viewAllLoans", produces = "application/json")
	public ResponseEntity<List<LoanApplication>> viewAllLoans() {
		log.info("Request received to view All Loans...");
		return ResponseEntity.ok().body(loanService.allAppliedLoansOfCustomerForAdmin());
	}

	@GetMapping("/viewAllCustomers")
	public ResponseEntity<List<User>> getAllCustomers() {
		log.info("Request received to view All Customers...");
		return ResponseEntity.ok().body(custService.viewAllCustomers());
	}

	@GetMapping("/viewCustomerDetails/{customerId}")
	public ResponseEntity<User> getCustomerById(@PathVariable long customerId) throws CustomerNotFoundException {
		log.info("Request received to view customer with Id: " + customerId);
		return ResponseEntity.ok().body(custService.viewCustomerDetailsById(customerId));
	}

	@GetMapping("/searchLoanForCustomer/{customerId}/{loanId}")
	public ResponseEntity<LoanApplication> searchLoanForCustomer(@PathVariable long customerId, @PathVariable long loanId)
			throws LoanNotFoundException {
		log.info("Request received to search laon by the loan No. of customer: " + customerId);
		return ResponseEntity.ok().body(loanService.searchAppliedLoan(customerId, loanId));
	}

	@GetMapping("/allLoanTypes")
	public ResponseEntity<List<LoanType>> viewAllLoanTypes() {
		log.info("Request received to view All LoanTypes...");
		return ResponseEntity.ok().body(loanTypeService.viewAvailableLoanType());
	}

	@GetMapping("/searchLoan/{loanId}")
	public ResponseEntity<LoanApplication> searchLoan(@PathVariable long loanId) throws LoanNotFoundException {
		log.info("Request received to view Loan by loanId");
		return ResponseEntity.ok().body(loanService.searchLoanById(loanId));
	}

	@PutMapping("/updateLoanType")
	public ResponseEntity<LoanType> updateLoanType(@RequestBody @Valid LoanType loanType) {
		log.info("Request received to update LoanType to: " + loanType);
		return ResponseEntity.ok().body(loanTypeService.updateLoanTypeById(loanType));
	}
	
	@GetMapping("/viewPropertyForLoan/{loanId}")
	public ResponseEntity<PropertyInfo> viewPropertyForLoan(@PathVariable long loanId) {
		log.info("Viewing Property set for loan application");
		return ResponseEntity.ok().body(propService.viewPropertyForLoan(loanId));
	}

	@GetMapping("/property-file/{propertyProofId}")
	public ResponseEntity<byte[]> downloadFile(@PathVariable Long propertyProofId) {
	    byte[] fileBytes = uploadService.downloadImageBytes(propertyProofId);
	    if (fileBytes != null) {
	        HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
	        headers.setContentDisposition(ContentDisposition.builder("attachment").filename("filename.ext").build());
	        return ResponseEntity.ok()
	                .headers(headers)
	                .body(fileBytes);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}
	
	@GetMapping("/customerIdProof/{userId}")
	public ResponseEntity<byte[]> downloadIdFile(@PathVariable long userId) {
		log.info("Downloading ID Proof");
	    byte[] fileBytes = adminService.downloadImageBytes(userId);
	    if (fileBytes != null && fileBytes.length>0) {
	    	log.info("FileBytes are valid...");
	        HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
	        headers.setContentDisposition(ContentDisposition.builder("attachment").filename("filename.ext").build());
	        return ResponseEntity.ok()
	                .headers(headers)
	                .body(fileBytes);
	    } else {
	    	log.info("No fileBytes are found inside controller.");
	        return ResponseEntity.notFound().build();
	    }
	}

	@ExceptionHandler({ LoanTypeAlreadyExistException.class })
	public ResponseEntity<String> handleLoanTypeRelated(LoanTypeAlreadyExistException e) {
		log.warn("Some Exception has Occurred....See the logs above and below.");
		return new ResponseEntity<>(e.getMessage(), HttpStatus.ALREADY_REPORTED);
	}

	@ExceptionHandler({ CustomerNotFoundException.class })
	public ResponseEntity<String> handleLoanTypeRelated(CustomerNotFoundException e) {
		log.warn("Some Exception has Occurred....See the logs above and below.");
		return new ResponseEntity<>(e.getMessage(), HttpStatus.ALREADY_REPORTED);
	}
}
