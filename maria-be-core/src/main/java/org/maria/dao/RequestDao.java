package org.maria.dao;

import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.maria.entity.RequestEntity;

import java.util.List;

@Slf4j
@Dependent
public class RequestDao {

    @Inject
    EntityManager em;

    public List<RequestEntity> getAll() {
        log.info("Attempting to fetch all requests");

        var requests = em.createQuery("SELECT r FROM RequestEntity r", RequestEntity.class).getResultList();

        log.info("Returning {} requests", requests.size());

        return requests;
    }

    public RequestEntity getById(Long id) {
        log.info("Attempting to fetch request with id {}", id);
        var request = em.find(RequestEntity.class, id);
        log.info("Returning request with id {}", id);
        return request;
    }

    @Transactional
    public RequestEntity create(RequestEntity request) {
        log.info("Attempting to create request");
        em.persist(request);
        log.info("Request created with id {}", request.getId());
        return request;
    }

    @Transactional
    public RequestEntity update(RequestEntity request) {
        log.info("Attempting to update request with id {}", request.getId());
        var updated = em.merge(request);
        log.info("Request with id {} updated", request.getId());
        return updated;
    }

    @Transactional
    public void delete(RequestEntity request) {
        log.info("Attempting to delete request with id {}", request.getId());
        em.remove(request);
        log.info("Request with id {} deleted", request.getId());
    }
}
