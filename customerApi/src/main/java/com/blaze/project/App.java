package com.blaze.project;

import java.util.EnumSet;

import javax.servlet.DispatcherType;
import javax.servlet.Filter;
import javax.servlet.FilterRegistration;

import org.bson.Document;
import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.blaze.project.resources.BlazeProjectHealthCheckResource;
import com.blaze.project.resources.CustomerResource;
import com.blaze.project.services.MongoService;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import io.dropwizard.Application;
// import io.dropwizard.Configuration;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class App extends Application<ProjectConfiguration>
{
    private static final Logger LOGGER = LoggerFactory.getLogger(App.class);
    public static void main(String[] args) throws Exception {
        new App().run(args);
    }
    @Override
    public void initialize(Bootstrap<ProjectConfiguration>b) {}
    @Override
    public void run(ProjectConfiguration config, Environment env) throws Exception {
        LOGGER.info("Method App#run() called");
        // Enable CORS headers
        final FilterRegistration.Dynamic cors =
                env.servlets().addFilter("CORS", (Class<? extends Filter>) CrossOriginFilter.class);
        // Configure CORS parameters
        cors.setInitParameter("allowedOrigins", "http://localhost:3000"); // host and port of UI dev server comes here
        cors.setInitParameter("allowedHeaders", "X-Requested-With,Content-Type,Accept,Origin");
        cors.setInitParameter("allowedMethods", "OPTIONS,GET,PUT,POST,DELETE,HEAD,UPDATE");
        // Add URL mapping
        cors.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");      
        // DO NOT pass a preflight request to down-stream auth filters
        // unauthenticated preflight requests should be permitted by spec
        cors.setInitParameter(CrossOriginFilter.CHAIN_PREFLIGHT_PARAM, Boolean.FALSE.toString());        

        MongoClientURI uri = new MongoClientURI(
        	    "mongodb+srv://" 
        	    + config.getUserName() + ":" 
        	    + config.getPassword() + "@"
        	    + config.getHost() + "/"
        	    + config.getCollection() 
        	    + "?retryWrites=true&w=majority");
        MongoClient mongoClient = new MongoClient(uri);
    	MongoManaged mongoManaged = new MongoManaged(mongoClient);
        env.lifecycle().manage(mongoManaged);
        MongoDatabase db = mongoClient.getDatabase(config.getDatabase());
        MongoCollection<Document> collection = db.getCollection(config.getCollection());
        LOGGER.info("Registering RESTful API resources");
        env.jersey().register(new CustomerResource(collection, new MongoService()));
        env.healthChecks().register("BlazeProjectHealthCheckResource",
                 new BlazeProjectHealthCheckResource(mongoClient));        	        
    }
}
