package org.maria.user.api;

import jakarta.ws.rs.*;
import org.maria.user.dto.UserModelDto;

import java.util.List;

@Path("/user")
@Produces("application/json")
@Consumes("application/json")
public interface UserCrudService {

    @GET
    List<UserModelDto> getUsers();

    @GET
    @Path("/{id}")
    UserModelDto getUserById(Long id);

    @POST
    UserModelDto createUser(UserModelDto user);

    @PUT
    UserModelDto updateUser(UserModelDto user);

    @DELETE
    void deleteUser(UserModelDto user);
}
