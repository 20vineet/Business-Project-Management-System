package com.bfms.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.bfms.model.Project;
import com.bfms.model.Project.ProjectStatus;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProjectDTO {

	@NotBlank(message = "Id is required")
	private String id;

	@NotBlank(message = "Project title is required")
	@Size(min = 3, max = 100, message = "Project title must be between 3 and 100 characters")
	private String title;

	@Size(max = 500, message = "Description cannot exceed 500 characters")
	private String description;

	@Future(message = "Start date must be in the future")
	private LocalDateTime startDate;

	@Future(message = "End date must be in the future")
	private LocalDateTime endDate;

	private List<EventDTO> events;
	private Project.ProjectStatus status;

	@NotBlank(message = "Contact email is required")
	private String contactEmail;

}