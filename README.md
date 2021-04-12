# blazeproject
Blaze Engineering Tech Project

## content
1. customerApi: Rest API server implemented using DropWizard
2. customerApi/config.yaml: contains information for connection to the database
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

# Questions
1. When dealing with a large volume of data, what can we do to make fetch faster?

Running this app was not that bad because client and server were in the same machine, to insert 100K records it took twelve (12) seconds, to load it before displaying onto the grid too three (3) seconds, but surely, if these was the real world, we would probably see some more delays for loading the data. If we're dealing with small sets of data (say a configuration table of 100 or so records) that's not a problem. Also remember that we're dealing with a small document (4 fields only) this will increase when we're dealing with bigger documents. For bigger datasets it is recommended to do lazy loading, i.e. we only load a small portion of data each time, say 100 records, and as we move along (scroll) we keep loading more and more onto the client. This requires some extra configuration on the server, say another API endopoint to load the given documents at a given location in the data set (e.g. give me 100 documents that start at position 4500 out of 100,000 total). 

3. What is the primary difference between NoSQL versus SQL
4. What is Guice amd what is the purpose of it?
