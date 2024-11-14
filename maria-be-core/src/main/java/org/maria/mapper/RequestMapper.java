package org.maria.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.maria.dto.request.HeaderCreateDto;
import org.maria.dto.request.QueryParameterCreateDto;
import org.maria.dto.request.RequestCreateModelDto;
import org.maria.entity.QueryParameterEntity;
import org.maria.entity.RequestEntity;
import org.maria.entity.RequestHeaderEntity;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.JAKARTA_CDI)
public interface RequestMapper {


    RequestCreateModelDto toDto(RequestEntity entity);

    List<RequestCreateModelDto> toDtoList(List<RequestEntity> entities);

    RequestEntity toEntity(RequestCreateModelDto dto);

    HeaderCreateDto toDto(RequestHeaderEntity entity);

    List<HeaderCreateDto> toDtoHeaderList(List<RequestHeaderEntity> entities);

    RequestHeaderEntity toEntity(HeaderCreateDto dto);

    List<RequestHeaderEntity> toEntityHeaderList(List<HeaderCreateDto> dtos);

    QueryParameterCreateDto toDto(QueryParameterEntity entity);

    List<QueryParameterCreateDto> toDtoParameterList(List<QueryParameterEntity> entities);

    QueryParameterEntity toEntity(QueryParameterCreateDto dto);

    List<QueryParameterEntity> toEntityParameterList(List<QueryParameterCreateDto> dtos);


}
