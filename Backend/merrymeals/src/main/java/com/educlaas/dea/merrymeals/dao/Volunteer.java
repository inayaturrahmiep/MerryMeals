package com.mow.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;


//Create volunteer table and define attributes
@Entity
@Table(name = "tb_volunteer", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
public class Volunteer {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private long volunteerId;
	
	@Column
	private int loginId;
	
	public int getLoginId() {
		return loginId;
	}

	public void setLoginId(int loginId) {
		this.loginId = loginId;
	}

	@Column(nullable = false)
	private String userName;
	
	@Email
	@Column(nullable = false)
	private String email;
	
	@JsonIgnore
	private String password;
	
	private String imageUrl;
	
	@Column(nullable = false)
	private Boolean emailVerified = false;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	private AuthProvider provider;
	
	private String providerId;



	public long getVolunteerId() {
		return volunteerId;
	}

	public void setVolunteerId(long volunteerId) {
		this.volunteerId = volunteerId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Boolean getEmailVerified() {
		return emailVerified;
	}

	public void setEmailVerified(Boolean emailVerified) {
		this.emailVerified = emailVerified;
	}

	public AuthProvider getProvider() {
		return provider;
	}

	public void setProvider(AuthProvider provider) {
		this.provider = provider;
	}

	public String getProviderId() {
		return providerId;
	}

	public void setProviderId(String providerId) {
		this.providerId = providerId;
	}
}
