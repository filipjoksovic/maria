package org.maria.request.impl;

import jakarta.inject.Inject;
import org.maria.request.api.RequestCrudService;
import org.maria.request.dao.RequestDao;
import org.maria.request.request.RequestCreateModelDto;
import org.maria.request.mapper.RequestMapper;

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
