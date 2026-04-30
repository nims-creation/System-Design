package com.syscraft.backend.dto;

import lombok.Data;

@Data
public class ArchitectureDto {
    private Long id;
    private String name;
    private String nodesJson;
    private String edgesJson;
}
