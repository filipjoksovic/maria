package org.maria.workspace.dao;

import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.maria.workspace.entity.WorkspaceEntity;

@Dependent
public class WorkspaceCrudDao {
    @Inject
    EntityManager em;

    @Transactional
    public WorkspaceEntity create(WorkspaceEntity workspace) {
        em.persist(workspace);
        return workspace;
    }
}
