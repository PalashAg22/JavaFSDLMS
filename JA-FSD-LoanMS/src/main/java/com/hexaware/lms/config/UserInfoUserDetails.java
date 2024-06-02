package com.hexaware.lms.config;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.hexaware.lms.entities.User;

public class UserInfoUserDetails implements UserDetails {

	Logger logger = LoggerFactory.getLogger(UserInfoUserDetails.class);
	private String username;
	private String password;
	private List<GrantedAuthority> authorities;
	private boolean isBlocked;

	public UserInfoUserDetails(User userInfo) {
		logger.info("Inside UserInfoUserDetails()");
		username = userInfo.getEmail();
		logger.info("Username: "+username);
		password = userInfo.getPassword();
		logger.info("Password: "+password);
		authorities = Arrays.stream(userInfo.getRole().split(",")).map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());
		isBlocked=userInfo.isBlocked();
		logger.info("User is blocked?: "+isBlocked);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return !isBlocked;
	}

}
