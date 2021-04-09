package com.blaze.project.services;

import com.blaze.project.representations.Customer;
import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
 
import java.util.ArrayList;
import java.util.List;
 
import static com.mongodb.client.model.Filters.*;
 
public class MongoService {
 
    public void insertOne(MongoCollection<Document> collection, Document document) {
        collection.insertOne(document);
    }
 
    public void insertMany(MongoCollection<Document> collection, List<Document> documents) {
        collection.insertMany(documents);
    }
 
    public List<Document> find(MongoCollection<Document> collection) {
        return collection.find().into(new ArrayList<>());
    }
 
    public List<Document> findByKey(MongoCollection<Document> collection, String key, String value) {
        return collection.find(eq(key, value)).into(new ArrayList<>());
    }
 
    public List<Document> findByCriteria(MongoCollection<Document> collection, String key, int lessThanValue, 
    		int greaterThanValue, int sortOrder) {
        List<Document> documents = new ArrayList<>();
        FindIterable<Document> iterable = collection.find(and(lt(key, lessThanValue),
                gt(key, greaterThanValue))).sort(new Document(key, sortOrder));
        iterable.into(documents);
        return documents;
    }
 
    public void updateOneEmployee(MongoCollection<Document> collection, String key1, String key2, String key3, String key4, Customer customer) {
        collection.updateOne(new Document(key1, customer.getEmail()),
                new Document("$set", 
                	new Document(key2, customer.getLastName())
                		.append(key3, customer.getFirstName())
                		.append(key4,  customer.getPhoneNumber()) ) 
                );
    }
 
    public void deleteOne(MongoCollection<Document> collection, String key, String value) {
        collection.deleteOne(eq(key, value));
    }
    public void deleteAll(MongoCollection<Document> collection) {
    	BasicDBObject document = new BasicDBObject();
        collection.deleteMany(document);
    }
    
}