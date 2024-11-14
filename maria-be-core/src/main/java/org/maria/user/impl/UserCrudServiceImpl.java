package org.maria.user.impl;

import jakarta.inject.Inject;
import org.maria.user.api.UserCrudService;
import org.maria.user.dao.UserCrudDao;
import org.maria.user.dto.UserModelDto;
import org.maria.user.mapper.UserMapper;

import java.util.List;

public class UserCrudServiceImpl implements UserCrudService {
    @Inject
    private UserCrudDao userCrudDao;
    @Inject
    UserMapper userMapper;

    @Override
    public List<UserModelDto> getUsers() {
        return userMapper.toDtoList(userCrudDao.getAll());
    }

    @Override
    public UserModelDto getUserById(Long id) {
        return userMapper.toDto(userCrudDao.getById(id));
    }

    @Override
    public UserModelDto createUser(UserModelDto user) {
        return userMapper.toDto(userCrudDao.create(userMapper.toEntity(user)));
    }

    @Override
    public UserModelDto updateUser(UserModelDto user) {
        return userMapper.toDto(userCrudDao.update(userMapper.toEntity(user)));
    }

    @Override
    public void deleteUser(UserModelDto user) {

    }
}
