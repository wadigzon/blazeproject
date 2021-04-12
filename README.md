# blazeproject
Blaze Engineering Tech Project

## content
1. customerApi: Rest API server implemented using DropWizard
2. customerApi/config.yaml: contains information for connecting to the database
3. client: Web App using React JS and ag-grid (for data vizualization)

**The mongodb database is running on the cloud I used my personal free tier at www.mongodb.com**

## Instructions
* To run the server:
  * Open a comamnd console   
  * go to customerApi directory
  * build the jar file: $ mvn package
  * deploy/execute server: $ java -jar target/customerApi-1.0-SNAPSHOT.jar server config.yaml
* To run the wep app (client)
  * Open another command console
  * go to client directory
  * deploy execute client: $ yarn start
  * it will deploy UI server on http://localhost:3000 and open a new page for you
* Running the client
  * On the top left, click on the three bars (accordion) that will display the main menu
  * Home: Is the home page
  * Insert 1K: Will insert 1,000 mock documents(records) in customer collection
  * Insert 10K: Will insert 10,000 mock documents(records) in customer collection
  * Insert 100K: Will insert 100,000 mock documents(records) in customer collection
  * Display Data: Will display the existing data from the mongodb server
    * To order by any column you click on the column label, 1st click ascending order, 2nd click descending order, 3rd click back to natural order (creation order)
    * To do some filtering search, hover to the right of the column label and you will find a little accordion icon, click on it and you can do more specific filtering and searching, and the grid will update accordingly.
  * Display Count: Will display the number of current documents in collection
  * Delete All: Willl reset the collection (remove all documents), you can check that records have been deleted by going to *Display Count* and seeing that the number of customers is indeed zero.

# Questions (and answers: my own words, so it might not be the correct answer)
**1. When dealing with a large volume of data, what can we do to make fetch faster?**

Running this app was not that bad because client and server were in the same machine, to insert 100K records it took twelve (12) seconds, to load it before displaying onto the grid, took three (3) seconds, but surely, if this was the real world, we would probably see some more delays for loading the data (client and server are not usually in the same area). If we're dealing with small sets of data (say a configuration table of 100 or so records) that's not a problem. Also remember that we're dealing with a small document (4 fields only) this will increase when we're dealing with bigger documents. For bigger datasets it is recommended to do lazy loading, i.e. we only load a small portion of data each time, say 100 records, and as we move along (scroll) we keep loading more and more onto the client. This requires some extra configuration on the server (and client), say another API endopoint to load the given documents at a given location in the data set (e.g. give me 100 documents that start at position 4500 out of 100,000 total). Ag grid supports "infinite" scrolling (I have done this in my last job but needs some additional settings on both client and server).

**2. What is the primary difference between NoSQL versus SQL**

SQL is relational meaning tables (collections) are related via some fields (keys) inside the tables. e.g. we have customer table (that has a field called customerId that identifies that customer), and we also have order table, that has information about the order, as we know this order is also made by a customer, we do not need to store the entire information of the user in this same space of data, we only store the key (id) of that user and that becomes the "relationship" of these two tables. NoSql are non-relational databases.

**3. What is Guice and what is the purpose of it?**

Guice is a java library made by google that helps in implementing dependency injection, dependency injection is a mechanism in which we can "inject" desired dependencies into an object via its constructor, so we can create loosely coupled objects in our software, whereas if we use "other" ways such as inheritance and composition we create tightly coupled objects, which doesn't help in scalability and maintanability of our software (we need our middleware to embrace change and do it in an efficient manner)

# Room for improvements
1. Implement lazy loading for data vizualization
2. Refactor: On Client we do not need to create different pages for 1K, 10K, 100K loading, we can just create a single component and inject the desired json file as parameter (props)
3. I needed to read more about using guice, it's integrated in the project but not being implemented (may be more time to find the right use case for a dependency manager in the server app)
4. Client needs lots of styling work
5. Add a page to create and update new and existing customers

# Problems and challenges found
1. Wasted a lot of time with CORS issues (postman worked just fine, but getting my react app to successfully talk to the API took a while)
2. Time constraint: Current job, busy week, 3 year old kid at home needs lots of attention

Thanks for the opportunity, learned a lot and enjoyed it!
