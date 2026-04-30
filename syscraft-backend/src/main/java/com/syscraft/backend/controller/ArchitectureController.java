package com.syscraft.backend.controller;

import com.syscraft.backend.dto.ArchitectureDto;
import com.syscraft.backend.dto.EvaluateRequestDto;
import com.syscraft.backend.model.Architecture;
import com.syscraft.backend.model.User;
import com.syscraft.backend.repository.ArchitectureRepository;
import com.syscraft.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/architectures")
@CrossOrigin(origins = "*")
public class ArchitectureController {

    @Autowired
    private ArchitectureRepository architectureRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> saveArchitecture(@RequestBody ArchitectureDto dto, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElse(null);
        
        if (user == null) {
            return ResponseEntity.status(401).body("User not found");
        }

        Architecture arch = new Architecture();
        arch.setUser(user);
        arch.setName(dto.getName());
        arch.setNodesJson(dto.getNodesJson());
        arch.setEdgesJson(dto.getEdgesJson());
        
        Architecture saved = architectureRepository.save(arch);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<?> getMyArchitectures(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElse(null);
        
        if (user == null) {
            return ResponseEntity.status(401).body("User not found");
        }

        List<Architecture> list = architectureRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        return ResponseEntity.ok(list);
    }

    @PostMapping("/evaluate")
    public ResponseEntity<?> evaluateArchitecture(@RequestBody EvaluateRequestDto request) {
        // Simulated AI Evaluation Logic
        List<Map<String, Object>> nodes = request.getNodes();
        
        boolean hasDb = false;
        boolean hasServer = false;
        boolean hasLb = false;
        boolean hasCache = false;

        for (Map<String, Object> node : nodes) {
            if (node.containsKey("data")) {
                Map<String, Object> data = (Map<String, Object>) node.get("data");
                String label = data.get("label").toString().toLowerCase();
                if (label.contains("database") || label.contains("db")) hasDb = true;
                if (label.contains("server") || label.contains("gateway")) hasServer = true;
                if (label.contains("load balancer") || label.contains("lb")) hasLb = true;
                if (label.contains("cache") || label.contains("redis")) hasCache = true;
            }
        }

        StringBuilder evaluation = new StringBuilder();
        evaluation.append("### AI Architecture Evaluation\n\n");
        
        if (!hasServer) {
            evaluation.append("❌ **Critical Issue:** No compute nodes (Servers) found. You need application servers to process business logic.\n");
        } else {
            evaluation.append("✅ **Compute:** Server nodes are present.\n");
        }

        if (!hasDb) {
            evaluation.append("❌ **Critical Issue:** No database found. Your application will not have persistent state.\n");
        } else {
            evaluation.append("✅ **Storage:** Database layer is present.\n");
        }

        if (hasServer && !hasLb) {
            evaluation.append("⚠️ **Improvement:** Consider adding a Load Balancer to distribute traffic across your servers for better scalability and fault tolerance.\n");
        } else if (hasLb) {
            evaluation.append("✅ **Scalability:** Load balancer is present. Good job handling distributed traffic.\n");
        }

        if (hasDb && !hasCache) {
            evaluation.append("⚠️ **Performance:** Consider adding a caching layer (like Redis) in front of your database to reduce read latency and DB load.\n");
        } else if (hasCache) {
            evaluation.append("✅ **Performance:** Caching layer is present. This will greatly improve read throughput.\n");
        }
        
        evaluation.append("\n**Overall Verdict:** ");
        if (hasServer && hasDb && hasLb && hasCache) {
            evaluation.append("Excellent production-ready design! 🚀");
        } else if (hasServer && hasDb) {
            evaluation.append("Good baseline design, but lacks scalability and performance optimizations. Keep improving! 🛠️");
        } else {
            evaluation.append("Incomplete design. Please add the missing fundamental components. ❌");
        }

        return ResponseEntity.ok(Map.of("evaluation", evaluation.toString()));
    }
}
