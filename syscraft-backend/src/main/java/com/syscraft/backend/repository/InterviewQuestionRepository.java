package com.syscraft.backend.repository;

import com.syscraft.backend.model.InterviewQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewQuestionRepository extends JpaRepository<InterviewQuestion, Long> {
    List<InterviewQuestion> findAllByOrderByCreatedAtDesc();
    List<InterviewQuestion> findByCompanyIgnoreCaseOrderByCreatedAtDesc(String company);
}
