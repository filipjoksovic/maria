package org.maria.request.request;

import lombok.Data;

@Data
public class HeaderCreateDto {
    private Long id;
    private String key;
    private String value;
    private String description;
    private Boolean isActive;
}
