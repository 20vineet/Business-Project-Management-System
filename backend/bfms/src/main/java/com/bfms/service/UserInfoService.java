package com.bfms.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bfms.model.Project;
import com.bfms.model.UserInfo;
import com.bfms.repository.UserInfoRepository;

@Service
public class UserInfoService {
	@Autowired
	private UserInfoRepository userInfoRepository;

	public Optional<UserInfo> getUserByUsername(String username) {
		return userInfoRepository.findByName(username);
	}
}
