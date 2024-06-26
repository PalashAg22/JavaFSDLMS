package com.hexaware.lms.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CommonExceptions {
	
	Logger log = LoggerFactory.getLogger(CommonExceptions.class);
	
	@ExceptionHandler({DataAlreadyPresentException.class})
	public ResponseEntity<String> handleCustomerPresentException(DataAlreadyPresentException e) {
		log.warn("Some Exception has Occurred....See the logs above and below.");
		return new ResponseEntity<>(e.getMessage(),HttpStatus.EXPECTATION_FAILED);
	}
	
	@ExceptionHandler({LoanNotFoundException.class})
	public ResponseEntity<String> handleException(LoanNotFoundException e){
		log.warn("Some Exception has Occurred....See the logs above and below.");
		return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler({LoginCredentialsNotFound.class})
	public ResponseEntity<String> handleLoginException(LoginCredentialsNotFound e){
		log.warn("Some Exception has Occurred....See the logs above and below.");
		return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
	}
//	@ExceptionHandler({Exception.class})
//	public ResponseEntity<String>handleLoginException(Exception e){
//		log.warn("Some Exception has Occurred....See the logs above and below.");
//		return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
//	}
}
