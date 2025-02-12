package com.bfms.controller;

import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bfms.dto.AuthRequest;
import com.bfms.model.UserInfo;
import com.bfms.security.JwtHelper;
import com.bfms.service.JwtService;
import com.bfms.service.JwtServices;
import com.bfms.service.ProjectService;

import jakarta.validation.Valid;
@RestController
//@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private JwtServices service;
	@Autowired
	private JwtService jwtService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@GetMapping("/welcome")
	public String welcome() {
		return "Welcome this endpoint is not secure";
	}
	
	 @PostMapping("/signup")
	    public String addNewUser(@RequestBody UserInfo userInfo) {
	        return service.addUser(userInfo);
	    }

//	@PostMapping("/authenticate")
//	public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
//		System.out.println("Username : " + authRequest.getUsername());
//		System.out.println("Password : " + authRequest.getPassword());
//		
//		try {
//			Authentication authentication = authenticationManager.authenticate(
//					new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
//			if (authentication.isAuthenticated()) {
//				return jwtService.generateToken(authRequest.getUsername());
//			} else {
//				throw new UsernameNotFoundException("invalid user request !");
//			}
//		}catch(Exception e) {
////			e.printStackTrace();
//			throw new UsernameNotFoundException("invalid user request !");
//		}
//	}
	 
	 @PostMapping("/authenticate")
	 public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
	     System.out.println("Username : " + authRequest.getUsername());
	     System.out.println("Password : " + authRequest.getPassword());

	     try {
	         Authentication authentication = authenticationManager.authenticate(
	                 new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
	         
	         if (authentication.isAuthenticated()) {
	             String token = jwtService.generateToken(authRequest.getUsername());
	             return ResponseEntity.ok(token); // Return token if authentication is successful
	         } else {
	             return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                     .body(Collections.singletonMap("message", "Invalid credentials!"));
	         }
	     } catch (Exception e) {
	         return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                 .body(Collections.singletonMap("message", "Invalid credentials!"));
	     }
	 }

}