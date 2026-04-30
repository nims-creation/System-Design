package com.syscraft.backend.service;

import com.syscraft.backend.dto.ChatRequest;
import com.syscraft.backend.dto.ChatResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class AiInterviewerService {

    private final Random random = new Random();

    public ChatResponse processMessage(ChatRequest request) {
        String msg = request.getMessage().toLowerCase();
        String response;

        if (msg.contains("hello") || msg.contains("hi") || msg.contains("start")) {
            response = "Hello! I am your AI System Design Interviewer. Today, we're going to design a distributed message queue like Kafka. How would you start approaching this problem?";
        } else if (msg.contains("requirements") || msg.contains("clarify")) {
            response = "Great start. Let's assume we need to handle 10 million messages per day, the payload size is 1KB, and messages need to be retained for 7 days. What is your estimate for bandwidth and storage?";
        } else if (msg.contains("storage") || msg.contains("bandwidth") || msg.contains("calculate")) {
            response = "Your calculations seem roughly correct. Now, how would you ensure high availability and partition tolerance for the message queue? (Hint: Think about replication and consensus algorithms).";
        } else if (msg.contains("replica") || msg.contains("zookeeper") || msg.contains("raft") || msg.contains("paxos")) {
            response = "Excellent. Using a consensus algorithm like Raft or leveraging ZooKeeper for leader election is standard. What happens if a broker goes down while a producer is sending a message?";
        } else if (msg.contains("ack") || msg.contains("acknowledge") || msg.contains("retry")) {
            response = "Spot on. Producer acknowledgments (acks=all) and retries ensure durability. Let's wrap up here. You've demonstrated a strong understanding of distributed systems. I'd rate this interview a 9/10!";
        } else {
            List<String> genericResponses = List.of(
                    "That's an interesting approach. Can you elaborate on the trade-offs of that decision?",
                    "How would that design handle a sudden 10x spike in traffic?",
                    "What happens if the database node running that process crashes?",
                    "Could you clarify how you would partition the data to ensure even distribution?"
            );
            response = genericResponses.get(random.nextInt(genericResponses.size()));
        }

        return new ChatResponse(response);
    }
}
