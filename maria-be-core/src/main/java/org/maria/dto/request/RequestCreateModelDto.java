package org.maria.dto.request;

import lombok.Data;
import org.maria.model.enums.RequestMethod;
import org.maria.model.enums.RequestSecurity;

import java.util.List;

@Data
public class RequestCreateModelDto {
    private Long id;
    private String name;
    private RequestMethod method;
    private RequestSecurity security;
    private String url;

    private List<HeaderCreateDto> headers;
    private List<QueryParameterCreateDto> parameters;

    private String body;
}
