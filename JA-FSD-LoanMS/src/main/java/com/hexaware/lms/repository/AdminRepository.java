//package com.hexaware.lms.repository;
//
//import java.util.Optional;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//import com.hexaware.lms.entities.Admin;
//
//@Repository
//public interface AdminRepository extends JpaRepository<Admin,Long>{
//
//	@Query("select a from Admin a where a.email=?1")
//	Optional<Admin> findByEmail(String email);
//	
//	@Modifying
//	@Query("update Admin d set d.profileImage=?1 ,d.image=?2 where d.adminId=?3")
//	void updateAdminProfilePic(String fileName,byte[] file,long adminId);
//}
