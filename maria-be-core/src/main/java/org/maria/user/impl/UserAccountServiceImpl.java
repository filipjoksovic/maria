package org.maria.user.impl;

import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;
import org.maria.user.api.UserAccountService;
import org.maria.user.dao.UserCrudDao;
import org.maria.user.dto.UserAccountModelDto;
import org.maria.user.dto.UserModelDto;
import org.maria.user.entity.UserEntity;
import org.maria.user.mapper.UserMapper;
import org.maria.workspace.dao.WorkspaceCrudDao;
import org.maria.workspace.entity.WorkspaceEntity;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Slf4j
public class UserAccountServiceImpl implements UserAccountService {

    @Inject
    private UserCrudDao userCrudDao;

    @Inject
    WorkspaceCrudDao workspaceCrudDao;

    @Inject
    private UserMapper userMapper;

    @Override
    public UserModelDto createUserAccount(UserAccountModelDto userAccount) {
        log.info("Creating user account: {}", userAccount);
        UserEntity userEntity = userMapper.toEntityFromAccountDetails(userAccount);
        userEntity = userCrudDao.create(userEntity);

        log.info("User created: {}", userEntity);
        return userMapper.toDto(userEntity);
    }
}
