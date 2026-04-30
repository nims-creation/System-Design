package com.syscraft.backend.dto;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class EvaluateRequestDto {
    private List<Map<String, Object>> nodes;
    private List<Map<String, Object>> edges;
}
