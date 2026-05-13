// 1. Imports
const MongoClient = require('mongodb').MongoClient;



// 2. Initialize Database Object
const database = {};



// 3. Variable to hold the database client instance
let dbClient;



// 4. Object Methods
database.initDB = (callback) => {
    if (dbClient) {
        console.log('Database is already initialized!');
        return callback(null, dbClient);
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then(client => {
            dbClient = client;
            callback(null, dbClient);
        })
        .catch(err => {
            callback(err);
        });
};

database.getDB = () => {
    if (!dbClient) {
        throw new Error('Database not initialized!');
    }
    return dbClient;
};



// 5. Export the database object
module.exports = { database };



/*
1. Imports
const MongoClient = require('mongodb').MongoClient;
____________________________________________________
We import the MongoClient class from the mongodb package. This class allows us to connect to a MongoDB database and perform operations on it. To be clear, this is not the collection object, but rather the client that manages the connection to the database. We will use this client to initialize our database connection and perform operations on it.



2. Initialize Database Object
let database = {}
____________________________________________________
Next, we create an empty object called database. This object will be used to store the MongoDB client instance once we initialize the connection. We will also add methods to this object for initializing the database and retrieving the client instance.



3. Variable to hold the database client instance
let dbClient;
____________________________________________________
We declare a variable called dbClient that will hold the MongoDB client instance once we establish a connection to the database. This variable is initially undefined, and will be assigned the client instance when we call the initDB method. This allows us to keep the client instance in a single variable that can be accessed by the methods of the database object.



4. Object Methods
database.initDB = (callback) => {
    if (dbClient) {
        console.log('Database is already initialized!');
        return callback(null, dbClient);
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then(client => {
            dbClient = client;
            callback(null, dbClient);
        })
        .catch(err => {
            callback(err);
        });
};
database.getDB = () => {
    if (!dbClient) {
        throw new Error('Database not initialized!');
    }
    return dbClient;
}
____________________________________________________
The database object has two methods. 
Heres a breakdown of both methods:
    - initDB(callback): This method initializes the database connection. It first checks if the database has already been initialized, and if so, it logs a message and returns the existing database instance via the callback. If the database is not initialized, it uses MongoClient.connect() to connect to the MongoDB server using the connection string from the environment variable MONGODB_URI. If the connection is successful, it stores the client instance in the dbClient variable and calls the callback with the client. If there is an error during connection, it calls the callback with the error.
    - getDB(): This method returns the database client instance. If the database has not been initialized yet, it throws an error. This method can be used in other parts of the application to access the database client after it has been initialized.



5. Export the database object
module.exports = { database };
____________________________________________________
Finally, we export the database object so that it can be imported and used in other parts of our application, such as in our server.js file where we will initialize the database connection before starting the server.
*/