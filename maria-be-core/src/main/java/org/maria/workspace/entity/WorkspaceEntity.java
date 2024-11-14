package org.maria.workspace.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.maria.user.entity.UserEntity;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "WORKSPACES")
@EqualsAndHashCode
public class WorkspaceEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "workspace_name")
    private String name;

    @ManyToMany(mappedBy = "workspaces")
    private List<UserEntity> users = new ArrayList<>();
}
