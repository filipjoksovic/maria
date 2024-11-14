package org.maria.request.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "REQUEST_HEADERS")
public class RequestHeaderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "param_key")
    private String key;

    @Column(name = "value")
    private String value;

    @Column(name = "description")
    private String description;

    @Column(name = "is_active")
    private Boolean isActive;
}
