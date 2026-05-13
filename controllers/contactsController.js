// 1. Imports
const mongodb = require('../data/database.js');
const ObjectId = require('mongodb').ObjectId;



// 2. Initialize Controller Object
const contactsController = {};



// 3. Controller Functions
contactsController.getAll = async (req, res) => {
    const result = await mongodb.database.getDB().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

contactsController.getSingle = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.database.getDB().db().collection('contacts').find({ _id: contactId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};



// 4. Export Controller Functions
module.exports = contactsController;



/*
1. Imports
const mongodb = require('../data/database.js');
const ObjectId = require('mongodb').ObjectId;
____________________________________________________
We import the necessary modules to create our contacts controller. Here's a breakdown of each import:
    - mongodb: This is our custom module that handles the connection to our MongoDB database. We will use this to access the database client and perform operations on the contacts collection.
    - ObjectId: This is a class from the mongodb package that allows us to create ObjectId instances, which are used as unique identifiers for documents in MongoDB. We will use this to convert the contact ID from the request parameters into an ObjectId instance when retrieving a single contact from the database.



2. Initialize Controller Object
const contactsController = {};
____________________________________________________
Next, we create an empty object called contactsController. This object will be used to store the controller functions for handling the logic of our API endpoints related to contacts. We will add methods to this object for retrieving all contacts and retrieving a single contact by ID.



3. Controller Functions
contactsController.getAll = async (req, res) => {
    const result = await mongodb.database.getDB().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    }
};
contactsController.getSingle = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.database.getDB().db().collection('contacts').find({ _id: contactId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};
____________________________________________________
We define two controller functions for handling the logic of our API endpoints related to contacts. Here's a breakdown of each function:
    - getAll: This function retrieves all contacts from the database. It uses the getDB() method from our database module to access the database client, then it calls db().collection('contacts').find() to retrieve all documents from the 'contacts' collection. The result is a cursor, so we call toArray() to convert it into an array of contacts. Finally, we set the response header to indicate that we're returning JSON, and we send the array of contacts in the response with a status code of 200 (OK).
    - getSingle: This function retrieves a single contact by ID from the database. It first converts the contact ID from the request parameters into an ObjectId instance. Then it uses the getDB() method to access the database client and calls db().collection('contacts').find({ _id: contactId }) to find the document with the matching ID in the 'contacts' collection. The result is a cursor, so we call toArray() to convert it into an array. Since we expect only one contact to be returned, we access the first element of the array (contacts[0]) and send it in the response with a status code of 200 (OK).



4. Export Controller Functions
module.exports = contactsController;
____________________________________________________
Finally, we export the contactsController object so that it can be imported and used in other parts of our application, such as in our routes/contactsRoutes.js file where we will use these controller functions as handlers for our API endpoints related to contacts. This allows us to keep our controller logic organized and separate from our route definitions, following the MVC (Model-View-Controller) pattern for better code organization and maintainability.
*/