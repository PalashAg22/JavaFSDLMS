package com.hexaware.lms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.hexaware.lms.entities.LoanApplication;

public interface LoanRepository extends JpaRepository<LoanApplication, Long> {

	@Query(value = "select * from loan_application where userId=? and loan_id=?", nativeQuery = true)
	LoanApplication findByLoanId(long userId, long loanId);

	List<LoanApplication> findAllByUserUserId(long userId);

	@Query("update LoanApplication lp set lp.status=?1 where lp.loanId=?2")
	@Modifying
	Integer updateLoanStatus(String status, long loanId);

	@Query("select lp from LoanApplication lp where lp.loanId=?1 and lp.user.userId = ?2")
	LoanApplication propertiesToCalculate(long loanApplicationId,long userId);

	@Query("select lp from LoanApplication lp where lp.user.userId=?1 and lp.loanType.loanTypeName=?2")
	List<LoanApplication> filterAppliedLoanByType(long userId, String loanTypeName);

	@Query("select lp from LoanApplication lp where lp.user.userId=?1 and lp.status=?2")
	List<LoanApplication> filterAppliedLoanByStatus(long userId, String status);
}
