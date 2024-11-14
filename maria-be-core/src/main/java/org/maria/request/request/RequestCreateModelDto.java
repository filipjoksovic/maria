package org.maria.request.request;

import lombok.Data;
import org.maria.request.enums.RequestMethod;
import org.maria.request.enums.RequestSecurity;

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
