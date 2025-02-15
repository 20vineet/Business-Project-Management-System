package com.bfms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bfms.model.Event;
import com.bfms.model.Project;
import com.bfms.repository.EventRepository;
import com.bfms.repository.ProjectRepository;
import com.bfms.service.EventService;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/events")
public class EventController {
	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	EventService eventService;

	@PostMapping("/project/{projectId}")
	public ResponseEntity<Project> createEvent(@Valid @PathVariable String projectId, @RequestBody Event event) {

		return ResponseEntity.ok(eventService.addNewEvent(projectId, event));
	}

	@GetMapping("/project/{projectId}")
	public ResponseEntity<Optional<Object>> getEventsByProject(@PathVariable String projectId) {

		return ResponseEntity.ok(eventService.getEventByProjectId(projectId));
	}
}