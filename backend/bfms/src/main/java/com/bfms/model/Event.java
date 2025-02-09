package com.bfms.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "events")
public class Event {
    @Id
    private String id;
    private String projectTitle;
    private String title;
    private String description;
    private LocalDateTime eventDate;
    private NotificationPreference notificationPreference;

    public enum NotificationPreference {
        ON_DAY, BEFORE_ONE_DAY, BEFORE_THREE_DAYS
    }

	public Event() {
		super();
	}

	public Event(String id, String projectTitle, String title, String description, LocalDateTime eventDate,
			NotificationPreference notificationPreference) {
		super();
		this.id = id;
		this.projectTitle = projectTitle;
		this.title = title;
		this.description = description;
		this.eventDate = eventDate;
		this.notificationPreference = notificationPreference;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getProjectTitle() {
		return projectTitle;
	}

	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getEventDate() {
		return eventDate;
	}

	public void setEventDate(LocalDateTime eventDate) {
		this.eventDate = eventDate;
	}

	public NotificationPreference getNotificationPreference() {
		return notificationPreference;
	}

	public void setNotificationPreference(NotificationPreference notificationPreference) {
		this.notificationPreference = notificationPreference;
	}
    
    
}