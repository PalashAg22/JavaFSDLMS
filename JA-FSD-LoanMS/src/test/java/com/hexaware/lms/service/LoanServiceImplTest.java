package com.hexaware.lms.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.hexaware.lms.dto.LoanApplicationDTO;
import com.hexaware.lms.dto.PropertyDTO;
import com.hexaware.lms.entities.LoanApplication;
import com.hexaware.lms.exception.CustomerNotEligibleException;
import com.hexaware.lms.exception.LoanNotFoundException;
import com.hexaware.lms.exception.PropertyAlreadyExistException;

import jakarta.mail.MessagingException;

@SpringBootTest
class LoanServiceImplTest {

	Logger logger = LoggerFactory.getLogger(LoanServiceImplTest.class);

	@Autowired
	ILoanService serviceTest;

	@Test
	void testApplyLoan() throws PropertyAlreadyExistException, IOException, CustomerNotEligibleException, MessagingException {
		LoanApplicationDTO loan = new LoanApplicationDTO();
		PropertyDTO property = new PropertyDTO();

		loan.setCustomerId(1053);
		loan.setLoanTypeId(3);
		loan.setPrincipal(97384735);
		loan.setTenureInMonths(48);

		property.setPropertyAddress("MFP");
		property.setPropertyAreaInm2(100);
		property.setPropertyValue(1232423);

		String dummyFileName = "defaultFileName.png";
		byte[] dummyFileContent = new byte[0];
		MultipartFile file = new MockMultipartFile(dummyFileName, dummyFileContent);

		LoanApplication newLoan = serviceTest.applyLoan(loan, property, file);
		logger.info("Test running for applying loan: " + loan);
		assertEquals(loan.getPrincipal(), newLoan.getPrincipal());
	}

	@Test
	void testInterestCalculator() {
		long loanApplicationId=2002;
		long customerId = 1001;
		double principal = 10000000;
		double rate = 10;
		int time = 72;
		double calculatedInterest = principal * rate * (time / 12);
		double returnedInterest = serviceTest.interestCalculator(loanApplicationId,customerId);
		logger.info("Test running to calculate interest");
		assertEquals(calculatedInterest, returnedInterest);
	}

	@Test
	void testEmiCalculator() {
		long loanApplicationId=2002;
		long customerId = 1001;
		double p = 10000000;
		double r = 10;
		int t = 72;
		double calculatedEmi = (p * r * Math.pow((1 + r), t)) / (Math.pow((1 + r), (t - 1)));
		double returnedEmi = serviceTest.emiCalculator(loanApplicationId,customerId);
		logger.info("Test running to calculate EMI");
		logger.info("Calulated: " + calculatedEmi);
		logger.info("Returned: " + returnedEmi);
		assertEquals(calculatedEmi, returnedEmi);
	}

	@Test
	void testFilterAppliedLoanByType() throws LoanNotFoundException {
		List<LoanApplication> loansByType = serviceTest.filterAppliedLoanByType(1001, "HOME LOAN");
		logger.info("All applied Loans by Type are here: " + loansByType);
		assertTrue(loansByType.size() > 0);
	}

	@Test
	void testFilterAppliedLoanByStatus() throws LoanNotFoundException {
		List<LoanApplication> loansByType = serviceTest.filterAppliedLoanByStatus(1001, "PENDING");
		logger.info("All applied Loans by Status are here: " + loansByType);
		assertTrue(loansByType.size() > 0);
	}

	@Test
	void testSearchAppliedLoan() throws LoanNotFoundException {
		long customerId = 1001;
		long loanId = 2002;
		LoanApplication loan = serviceTest.searchAppliedLoan(customerId, loanId);
		logger.info("Test running by Customer to search loan: " + loan);
		assertNotNull(loan);
	}

	@Test
	void testAllAppliedLoansOfCustomer() {
		long customerId = 1001;
		List<LoanApplication> allLoans = serviceTest.allAppliedLoansOfCustomer(customerId);
		logger.info("Test running to search loan of customer: " + customerId);
		assertTrue(allLoans.size() > 0);
	}

	@Test
	void testAllAppliedLoansOfCustomerForAdmin() {
		List<LoanApplication> allLoans = serviceTest.allAppliedLoansOfCustomerForAdmin();
		logger.info("Test running to view all applied loans of customer: ");
		assertTrue(allLoans.size() > 0);
	}

	@Test
	void testCustomerUpdateLoanStatus() throws LoanNotFoundException {
		long loanId = 2002;
		String status = "Approved";
		serviceTest.customerUpdateLoanStatus(loanId, status);
		String updatedStatus = serviceTest.searchLoanById(loanId).getStatus();
		logger.info("Test running to set loan status: " + updatedStatus + " for " + loanId);
		assertEquals(status, updatedStatus);
	}

	@Test
	void testSearchLoanById() throws LoanNotFoundException {
		long loanId = 2002;
		LoanApplication loan = serviceTest.searchLoanById(loanId);
		logger.info("Test running by admin to search loan: " + loan);
		assertNotNull(loan);
	}

}
