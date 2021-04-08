package com.blaze.project.resources;

import com.codahale.metrics.health.HealthCheck;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCursor;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BlazeProjectHealthCheckResource extends HealthCheck {
    private static final Logger logger = LoggerFactory.getLogger(BlazeProjectHealthCheckResource.class);
    
    private MongoClient mongoClient;
 
    public BlazeProjectHealthCheckResource(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }
 
    @Override
    protected Result check() throws Exception {
        List<String> dbs = new ArrayList<>();
        MongoCursor<String> dbsCursor = mongoClient.listDatabaseNames().iterator();
        while (dbsCursor.hasNext()) {
            dbs.add(dbsCursor.next());
        }
        if (dbs.size() > 0) {
            return Result.healthy("Database names in MongogDB are: " + dbs);
        }
        return Result.unhealthy("DropwizardMongoDB Service is down");
    }
}
