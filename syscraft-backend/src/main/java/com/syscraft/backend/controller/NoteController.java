package com.syscraft.backend.controller;

import com.syscraft.backend.model.Note;
import com.syscraft.backend.model.User;
import com.syscraft.backend.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NoteController {

    private final NoteRepository noteRepository;

    @GetMapping
    public ResponseEntity<List<Note>> getUserNotes(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(noteRepository.findByUserOrderByUpdatedAtDesc(user));
    }

    @GetMapping("/topic/{topic}")
    public ResponseEntity<List<Note>> getNotesByTopic(@AuthenticationPrincipal User user, @PathVariable String topic) {
        return ResponseEntity.ok(noteRepository.findByUserAndTopic(user, topic));
    }

    @PostMapping
    public ResponseEntity<Note> createNote(@AuthenticationPrincipal User user, @RequestBody Note noteRequest) {
        noteRequest.setUser(user);
        return ResponseEntity.ok(noteRepository.save(noteRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@AuthenticationPrincipal User user, @PathVariable Long id, @RequestBody Note noteRequest) {
        return noteRepository.findById(id)
                .filter(note -> note.getUser().getId().equals(user.getId()))
                .map(existingNote -> {
                    existingNote.setTopic(noteRequest.getTopic());
                    existingNote.setContent(noteRequest.getContent());
                    return ResponseEntity.ok(noteRepository.save(existingNote));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@AuthenticationPrincipal User user, @PathVariable Long id) {
        return noteRepository.findById(id)
                .filter(note -> note.getUser().getId().equals(user.getId()))
                .map(note -> {
                    noteRepository.delete(note);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
