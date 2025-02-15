package com.bfms.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "projects")
public class Project {
	@Id
	private String id;
	private String title;
	private String description;
	private LocalDateTime startDate;
	private LocalDateTime endDate;
	private List<Event> events;
	private ProjectStatus status;
	private String contactEmail;

	public enum ProjectStatus {
	    PLANNING, IN_PROGRESS, COMPLETED, ON_HOLD;

	    @JsonCreator
	    public static ProjectStatus fromString(String value) {
	        return ProjectStatus.valueOf(value.toUpperCase());
	    }
	}

//
//	public Project() {
//		super();
//	}
//
//	public Project(String id, String title, String description, LocalDateTime startDate, LocalDateTime endDate,
//			List<Event> events, ProjectStatus status, String contactEmail) {
//		super();
//		this.id = id;
//		this.title = title;
//		this.description = description;
//		this.startDate = startDate;
//		this.endDate = endDate;
//		this.events = events;
//		this.status = status;
//		this.contactEmail = contactEmail;
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
//	public List<Event> getEvents() {
//		return events;
//	}
//
//	public void setEvents(List<Event> events) {
//		this.events = events;
//	}
//
//	public ProjectStatus getStatus() {
//		return status;
//	}
//
//	public void setStatus(ProjectStatus status) {
//		this.status = status;
//	}
//
//	public String getContactEmail() {
//		return contactEmail;
//	}
//
//	public void setContactEmail(String contactEmail) {
//		this.contactEmail = contactEmail;
//	}

	
}