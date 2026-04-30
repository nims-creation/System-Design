package com.syscraft.backend.repository;

import com.syscraft.backend.model.Note;
import com.syscraft.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByUserOrderByUpdatedAtDesc(User user);
    List<Note> findByUserAndTopic(User user, String topic);
}
