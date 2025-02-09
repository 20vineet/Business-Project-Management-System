package com.bfms.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bfms.model.Project;
import com.bfms.model.UserInfo;
import com.bfms.service.UserInfoService;

@RestController
@RequestMapping("/api/users")
public class UserInfoController {
	@Autowired
	private UserInfoService userInfoService;
	
	@GetMapping("/{username}")
    public ResponseEntity<UserInfo> getProjectById(@PathVariable String username) {
//        return userInfoService.getUserByUsername(username)
//            .map(ResponseEntity::ok)
//            .orElse(ResponseEntity.notFound().build());
        Optional<UserInfo> userInfo = userInfoService.getUserByUsername(username);
        userInfo.get().setPassword("");
        return userInfo.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
        
    }
}
