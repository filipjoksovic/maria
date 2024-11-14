package org.maria.user.dto;

import lombok.Data;
import org.maria.workspace.dto.WorkspaceModelDto;

import java.util.List;
import java.util.Set;

@Data
public class UserModelDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;

    List<WorkspaceModelDto> workspaces;
}
