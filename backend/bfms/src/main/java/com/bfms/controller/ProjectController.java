package com.bfms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bfms.model.Event;
import com.bfms.model.Project;
import com.bfms.repository.ProjectRepository;
import com.bfms.service.ProjectService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody Project project) {
        return ResponseEntity.ok(projectService.addNewProject(project));
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(@PathVariable String projectId) {
        return projectService.getProjectById(projectId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<Project> updateProject(
        @PathVariable String projectId, 
        @Valid @RequestBody Project project
    ) {
        return ResponseEntity.ok(projectService.updateProject(projectId, project));
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> deleteProject(@PathVariable String projectId) {
        projectService.deleteProject(projectId);
        return ResponseEntity.ok().build();
    }
    
    //Methods for getting the projects by status
    @GetMapping("/getProjectsByStatus/{status}")
    public ResponseEntity<List<Project>> getProjectByStatus(@PathVariable String status) {
        return ResponseEntity.ok(projectService.getProjectByStatus(status));
    }
    
    @GetMapping("/upcoming-events")
    public ResponseEntity<List<Event>> getUpcomingEvents() {
        List<Event> upcomingEvents = projectService.getUpcomingEvents();
        return ResponseEntity.ok(upcomingEvents);
    }
}