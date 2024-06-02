package com.hexaware.lms.service;

import java.util.List;

import com.hexaware.lms.dto.AdminDTO;
import com.hexaware.lms.dto.UserDTO;
import com.hexaware.lms.entities.User;
import com.hexaware.lms.exception.DataAlreadyPresentException;

public interface IAdminService {

	boolean register(AdminDTO adminDto) throws DataAlreadyPresentException;

	public byte[] downloadImageBytes(long userId);
	boolean updateAccount(UserDTO adminDto) throws DataAlreadyPresentException;

	List<User> getAllAdmins();

}
