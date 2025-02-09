package com.bfms.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.bfms.model.Event;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
//    List<Event> findByProjectId(String projectId);
    List<Event> findByEventDateBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("{'eventDate': {$lte: ?0}, 'notificationPreference': ?1}")
    List<Event> findUpcomingEventsForNotification(LocalDateTime currentTime, Event.NotificationPreference preference);
}