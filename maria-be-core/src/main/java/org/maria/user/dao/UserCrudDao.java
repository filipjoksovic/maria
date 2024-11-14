package org.maria.user.dao;

import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.maria.user.entity.UserEntity;
import org.maria.workspace.entity.WorkspaceEntity;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Dependent
public class UserCrudDao {
    @Inject
    EntityManager em;

    public List<UserEntity> getAll() {
        return em.createQuery("SELECT u FROM UserEntity u", UserEntity.class).getResultList();
    }

    public UserEntity getById(Long id) {
        return em.find(UserEntity.class, id);
    }

    @Transactional
    public UserEntity create(UserEntity user) {
        UserEntity userEntity = new UserEntity();

        userEntity.setFirstName(user.getFirstName());
        userEntity.setLastName(user.getLastName());
        userEntity.setEmail(user.getEmail());

        WorkspaceEntity workspaceEntity = new WorkspaceEntity();
        workspaceEntity.setName("%s's Workspace".formatted(user.getFirstName()));
        em.persist(workspaceEntity);

        workspaceEntity.getUsers().add(userEntity);
        userEntity.getWorkspaces().add(workspaceEntity);

        em.persist(userEntity);

        return userEntity;
    }

    @Transactional
    public UserEntity update(UserEntity user) {
        return em.merge(user);
    }

    @Transactional
    public void delete(UserEntity user) {
        em.remove(user);
    }
}
