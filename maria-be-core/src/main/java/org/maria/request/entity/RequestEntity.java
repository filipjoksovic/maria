package org.maria.request.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.maria.request.enums.RequestMethod;
import org.maria.request.enums.RequestSecurity;

import java.util.List;

@Data
@Entity
@Table(name = "REQUESTS")
public class RequestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private RequestMethod method;

    private RequestSecurity security;

    private String url;

    @OneToMany
    @JoinColumn(name = "request_id")
    private List<RequestHeaderEntity> headers;

    @OneToMany
    @JoinColumn(name = "request_id")
    private List<QueryParameterEntity> parameters;

}
