package org.maria.impl;

import jakarta.inject.Inject;
import org.maria.api.RequestCrudService;
import org.maria.dao.RequestDao;
import org.maria.dto.request.RequestCreateModelDto;
import org.maria.mapper.RequestMapper;

import java.util.List;

public class RequestCrudServiceImpl implements RequestCrudService {
    @Inject
    RequestDao requestDao;
    @Inject
    RequestMapper requestMapper;

    @Override
    public List<RequestCreateModelDto> getRequests() {
        return requestMapper.toDtoList(requestDao.getAll());
    }

    @Override
    public RequestCreateModelDto getRequestById(Long id) {
        return null;
    }

    @Override
    public RequestCreateModelDto createRequest(RequestCreateModelDto request) {
        return requestMapper.toDto(requestDao.create(requestMapper.toEntity(request)));
    }

    @Override
    public RequestCreateModelDto updateRequest(RequestCreateModelDto request) {
        return null;
    }

    @Override
    public void deleteRequest(RequestCreateModelDto request) {

    }
}
