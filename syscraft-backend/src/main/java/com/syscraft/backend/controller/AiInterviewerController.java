package com.syscraft.backend.controller;

import com.syscraft.backend.dto.ChatRequest;
import com.syscraft.backend.dto.ChatResponse;
import com.syscraft.backend.service.AiInterviewerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AiInterviewerController {

    private final AiInterviewerService aiInterviewerService;

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        return ResponseEntity.ok(aiInterviewerService.processMessage(request));
    }
}
