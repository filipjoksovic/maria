package org.maria.request.api;

import jakarta.ws.rs.*;
import org.maria.request.request.RequestCreateModelDto;

import java.util.List;

@Path("/request")
@Produces("application/json")
@Consumes("application/json")
public interface RequestCrudService {

    @GET
    public List<RequestCreateModelDto> getRequests() throws WebApplicationException;

    @GET
    @Path("/{id}")
    public RequestCreateModelDto getRequestById(@PathParam("id") Long id) throws WebApplicationException;

    @POST
    public RequestCreateModelDto createRequest(RequestCreateModelDto request) throws WebApplicationException;

    @PUT
    public RequestCreateModelDto updateRequest(RequestCreateModelDto request) throws WebApplicationException;

    @DELETE
    public void deleteRequest(RequestCreateModelDto request) throws WebApplicationException;
}
