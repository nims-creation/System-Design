package com.syscraft.backend.controller;

import com.syscraft.backend.model.InterviewQuestion;
import com.syscraft.backend.model.User;
import com.syscraft.backend.repository.InterviewQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/interview-questions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class InterviewQuestionController {

    private final InterviewQuestionRepository questionRepository;

    @GetMapping
    public ResponseEntity<List<InterviewQuestion>> getAllQuestions() {
        return ResponseEntity.ok(questionRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/company/{company}")
    public ResponseEntity<List<InterviewQuestion>> getQuestionsByCompany(@PathVariable String company) {
        return ResponseEntity.ok(questionRepository.findByCompanyIgnoreCaseOrderByCreatedAtDesc(company));
    }

    @PostMapping
    public ResponseEntity<InterviewQuestion> addQuestion(@AuthenticationPrincipal User user, @RequestBody InterviewQuestion question) {
        question.setSubmittedBy(user);
        return ResponseEntity.ok(questionRepository.save(question));
    }

    @PostMapping("/{id}/upvote")
    public ResponseEntity<InterviewQuestion> upvoteQuestion(@PathVariable Long id) {
        return questionRepository.findById(id)
                .map(question -> {
                    question.setUpvotes(question.getUpvotes() + 1);
                    return ResponseEntity.ok(questionRepository.save(question));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
