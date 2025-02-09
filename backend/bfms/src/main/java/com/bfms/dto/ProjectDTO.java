package com.bfms.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.bfms.model.Project;
import com.bfms.model.Project.ProjectStatus;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProjectDTO {
//	private String id;
//
//	private String title;
//
//	private String description;
//
//	private LocalDateTime startDate;
//
//	private LocalDateTime endDate;
//
//	private List<EventDTO> events;
//	private Project.ProjectStatus status;
//
//	public ProjectDTO() {
//		super();
//	}
//
//	public ProjectDTO(String id, String title, String description, LocalDateTime startDate, LocalDateTime endDate,
//			List<EventDTO> events, ProjectStatus status) {
//		super();
//		this.id = id;
//		this.title = title;
//		this.description = description;
//		this.startDate = startDate;
//		this.endDate = endDate;
//		this.events = events;
//		this.status = status;
//	}
//
//	public String getId() {
//		return id;
//	}
//
//	public void setId(String id) {
//		this.id = id;
//	}
//
//	public String getTitle() {
//		return title;
//	}
//
//	public void setTitle(String title) {
//		this.title = title;
//	}
//
//	public String getDescription() {
//		return description;
//	}
//
//	public void setDescription(String description) {
//		this.description = description;
//	}
//
//	public LocalDateTime getStartDate() {
//		return startDate;
//	}
//
//	public void setStartDate(LocalDateTime startDate) {
//		this.startDate = startDate;
//	}
//
//	public LocalDateTime getEndDate() {
//		return endDate;
//	}
//
//	public void setEndDate(LocalDateTime endDate) {
//		this.endDate = endDate;
//	}
//
//	public List<EventDTO> getEvents() {
//		return events;
//	}
//
//	public void setEvents(List<EventDTO> events) {
//		this.events = events;
//	}
//
//	public Project.ProjectStatus getStatus() {
//		return status;
//	}
//
//	public void setStatus(Project.ProjectStatus status) {
//		this.status = status;
//	}
	
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