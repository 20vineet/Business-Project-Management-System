package com.bfms.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.bfms.model.UserInfo;

public interface UserInfoRepository extends MongoRepository<UserInfo, String>{
	Optional<UserInfo> findByName(String username);
}
