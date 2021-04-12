package com.blaze.project.resources;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*; 
import javax.ws.rs.core.*;

import org.bson.Document;

import com.blaze.project.representations.Customer;
import com.blaze.project.services.MongoService;
import com.codahale.metrics.annotation.Timed;
import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoCollection;

@Path("/customer")
@Produces(MediaType.APPLICATION_JSON)
public class CustomerResource {
	private MongoCollection<Document> collection;
    private final MongoService mongoService;
    
    public CustomerResource(MongoCollection<Document> collection, MongoService mongoService) {
        this.collection = collection;
        this.mongoService = mongoService;
    }
    
	@POST
	@Timed
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)	
	public Response createCustomer(@NotNull @Valid final Customer customer) {
        Gson gson = new Gson();
        String json = gson.toJson(customer);
        mongoService.insertOne(collection, new Document(BasicDBObject.parse(json)));
        Map<String, String> response = new HashMap<>();
        response.put("message", "One customer created successfully");
        return Response.ok(response).build();
	}
    
    @POST
    @Timed
    @Path("/createCustomers")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createCustomers(@NotNull final List<Customer> customers) {
        List<Document> customerDocuments = new ArrayList<>();
        Gson gson = new Gson();
        String json;
        for (Customer customer : customers) {
            json = gson.toJson(customer);
            customerDocuments.add(new Document(BasicDBObject.parse(json)));
        }
        mongoService.insertMany(collection, customerDocuments);
        Map<String, String> response = new HashMap<>();
        response.put("message", customers.size() + " customer(s) created successfully");
        return Response.ok(response)
        		.build();
    }
    
    @GET
    @Timed
    public Response getCustomers() {
        List<Document> documents = mongoService.find(collection);
        return Response.ok(documents)
        		.build();
    }
    
	// code
	@GET
	@Path("/{email}")
	public Response getCustomer(@PathParam("email") String email) {
		// retrieve information about customer with provided id
        List<Document> documents = mongoService.findByKey(collection, "email", email);
        return Response.ok(documents).build();
	}
	
	@GET
	@Path("/count")
    @Produces(MediaType.APPLICATION_JSON)
	public Response getCount() {
		// count number of records
        long count = collection.count();
        Map<String, Long> response = new HashMap<>();
        response.put("count", count);
        return Response.ok(response)
        		.build();
	}

	@PUT
	// @Path("/{id}")
	@Timed
	public Response updateCustomer(@NotNull @Valid 
			final Customer customer
			) {
        mongoService.updateOneEmployee(collection, "email", "lastName", "firstName", "phoneNumber",  customer);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Customer with eMail: " + customer.getEmail() + " updated successfully");
        return Response.ok(response).build();
	}
	
    @DELETE
    @Timed
    @Path("{email}")
    public Response deleteCustomer(@PathParam("email") final String email) {
        mongoService.deleteOne(collection, "email", email);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Employee with eMail: " + email + " deleted successfully");
        return Response.ok(response).build();
    }
    
    @DELETE
    @Timed
    @Path("/deleteAll")
    public Response deleteAll() {
        Map<String, String> response = new HashMap<>();
        // count number of documents in collection
        long count = collection.count();
        mongoService.deleteAll(collection);
        response.put("message", "deleted all (" + count + ") documents in collection successfully");
        return Response.ok(response)
        		.build();
    }
}
