package com.bfms.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.bfms.model.Event;
import com.bfms.model.Event.NotificationPreference;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;



public class EventDTO {
//	private String id;
//	private String projectId;
//
//	private String title;
//
//	private String description;
//
//	private LocalDateTime eventDate;
//
//	private Event.NotificationPreference notificationPreference;
//
//	public EventDTO() {
//		super();
//	}
//
//	public EventDTO(String id, String projectId, String title, String description, LocalDateTime eventDate,
//			NotificationPreference notificationPreference) {
//		super();
//		this.id = id;
//		this.projectId = projectId;
//		this.title = title;
//		this.description = description;
//		this.eventDate = eventDate;
//		this.notificationPreference = notificationPreference;
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
//	public String getProjectId() {
//		return projectId;
//	}
//
//	public void setProjectId(String projectId) {
//		this.projectId = projectId;
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
//	public LocalDateTime getEventDate() {
//		return eventDate;
//	}
//
//	public void setEventDate(LocalDateTime eventDate) {
//		this.eventDate = eventDate;
//	}
//
//	public Event.NotificationPreference getNotificationPreference() {
//		return notificationPreference;
//	}
//
//	public void setNotificationPreference(Event.NotificationPreference notificationPreference) {
//		this.notificationPreference = notificationPreference;
//	}
	
	@NotBlank(message = "Id is required")
	private String id;
    private String projectTitle;

    @NotBlank(message = "Event title is required")
    @Size(min = 3, max = 100, message = "Event title must be between 3 and 100 characters")
    private String title;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    @Future(message = "Event date must be in the future")
    private LocalDateTime eventDate;

    private Event.NotificationPreference notificationPreference;

}
