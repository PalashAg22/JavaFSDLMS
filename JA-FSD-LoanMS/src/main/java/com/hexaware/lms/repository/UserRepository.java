package com.hexaware.lms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hexaware.lms.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{

	@Query("select u from User u where u.phoneNumber = ?1")
	User findByPhoneNumber(long phoneNumber);

	@Query("select u from User u where u.email =?1")	
	Optional<User> findByEmail(String email);
	
	@Modifying
	@Query("update User u set u.profileImage=?1,u.image=?2 where u.userId=?3")
	void updateUserProfilePic(String fileName,byte[] file,long userId);

	@Query("select u from User u where u.phoneNumber=?1 and u.userId != ?2")
	Optional<User >findByPhoneNumber(long phoneNumber, long userId);

	@Query("select u from User u where u.email=?1 and u.userId != ?2")
	Optional<User> findByEmail(String email, long userId);
	
	@Query("select u from User u where u.role=?1")
	List<User> findCustomers(String role);
	
	@Query("select u from User u where u.role=?1")
	List<User> findAdmins(String role);
	
}
