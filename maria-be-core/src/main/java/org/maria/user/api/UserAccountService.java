package org.maria.user.api;

import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import org.maria.user.dto.UserAccountModelDto;
import org.maria.user.dto.UserModelDto;

@Path("/user")
public interface UserAccountService {
    @POST
    @Path("/account")
    UserModelDto createUserAccount(UserAccountModelDto userAccount);
}
