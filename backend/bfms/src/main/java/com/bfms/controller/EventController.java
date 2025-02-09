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


//@RestController
//@RequestMapping("/api/events")
//public class EventController {
//    @Autowired
//    private EventRepository eventRepository;
//
//    @PostMapping
//    public ResponseEntity<Event> createEvent(@Valid @RequestBody Event event) {
//        return ResponseEntity.ok(eventRepository.save(event));
//    }
//
//    @GetMapping("/project/{projectId}")
//    public ResponseEntity<List<Event>> getEventsByProject(@PathVariable String projectId) {
//        return ResponseEntity.ok(eventRepository.findByProjectId(projectId));
//    }
//}

@RestController
@CrossOrigin
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    EventService eventService;

//    @PostMapping
//    public ResponseEntity<Event> createEvent(@Valid @RequestBody Event event) {
//        return ResponseEntity.ok(projectRepository.save(event));
//    }
    
    @PostMapping("/project/{projectId}")
    public ResponseEntity<Project> createEvent(@Valid @PathVariable String projectId, @RequestBody Event event) {
//    	Project project = projectRepository.findById(projectId).get();
//    	
//    	List<Event> eventList = project.getEvents();
//    	
//    	eventList.add(event);
//    	
//    	project.setEvents(eventList);
//    	
//    	eventService.addNewEvent(projectId, event);
//        return ResponseEntity.ok(projectRepository.save(project));
    	return ResponseEntity.ok(eventService.addNewEvent(projectId, event));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<Optional<Object>> getEventsByProject(@PathVariable String projectId) {
//        return ResponseEntity.ok(projectRepository.findByProjectId(projectId));
    	
//    	Optional<Object> eventList = projectRepository.findById(projectId).map(project -> project.getEvents());
    	
//    	return ResponseEntity.ok(eventList);
    	
    	return ResponseEntity.ok(eventService.getEventByProjectId(projectId));
    }
}