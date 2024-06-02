package com.hexaware.lms.service;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hexaware.lms.entities.User;
import com.hexaware.lms.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProfileImageStorageService {

	@Autowired
	UserRepository repo;

	Logger log = LoggerFactory.getLogger(ProfileImageStorageService.class);

	public String uploadFile(MultipartFile file, long userId) {
		User user = null;
		user = repo.findById(userId).orElse(user);
		byte[] fileData = null;
		try {
			fileData = file.getBytes();
		} catch (IOException e) {
			e.printStackTrace();
		}
		if (user != null) {
			repo.updateUserProfilePic(file.getOriginalFilename(), fileData, userId);
		}
		return "File uploaded : " + file.getOriginalFilename();
	}

	public String deleteFile(String fileName, long userId) {
		User user = repo.findById(userId).orElse(null);
		if (user != null) {
			repo.updateUserProfilePic("null", null, userId);
		}
		return "File deleted successfully";
	}
}
