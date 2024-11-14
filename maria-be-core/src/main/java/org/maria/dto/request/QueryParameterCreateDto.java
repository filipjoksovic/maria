package org.maria.dto.request;

import lombok.Data;

@Data
public class QueryParameterCreateDto {
    private Long id;
    private String key;
    private String value;
    private String description;
}
