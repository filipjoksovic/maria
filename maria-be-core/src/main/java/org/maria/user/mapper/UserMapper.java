package org.maria.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;
import org.maria.user.dto.UserAccountModelDto;
import org.maria.user.dto.UserModelDto;
import org.maria.user.entity.UserEntity;
import org.maria.workspace.dto.WorkspaceModelDto;
import org.maria.workspace.entity.WorkspaceEntity;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = MappingConstants.ComponentModel.JAKARTA_CDI)
public interface UserMapper {

    @Named("workspaceMapper")
    default List<WorkspaceModelDto> workspaceMapper(List<WorkspaceEntity> ws) {
        if (ws == null) {
            return null;
        }

        return ws.stream().map(w -> {
            WorkspaceModelDto dto = new WorkspaceModelDto();
            dto.setId(w.getId());
            dto.setName(w.getName());
            return dto;
        }).collect(Collectors.toList());
    }

    @Mapping(target = "workspaces", source = "workspaces", qualifiedByName = "workspaceMapper")
    UserModelDto toDto(UserEntity entity);

    UserEntity toEntity(UserModelDto dto);

    UserEntity toEntityFromAccountDetails(UserAccountModelDto dto);

    List<UserModelDto> toDtoList(List<UserEntity> entities);

    List<UserEntity> toEntityList(List<UserModelDto> dtos);
}
