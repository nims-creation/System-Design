package com.syscraft.backend.repository;

import com.syscraft.backend.model.Architecture;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ArchitectureRepository extends JpaRepository<Architecture, Long> {
    List<Architecture> findByUserIdOrderByCreatedAtDesc(Long userId);
}
