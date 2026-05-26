// * 1. Imports
const mongodb = require("../data/connect.js");
const ObjectId = require("mongodb").ObjectId;

// * 2. Initialize Controller Object
const contactsController = {};

const getContactsCollection = () => {
    return mongodb.database.getDB().db().collection("contacts");
};

const sendServerError = (res, error, message) => {
    console.error(message, error);
    res.status(500).json({ error: message });
};

const buildContactFromBody = (body) => {
    return {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        favoriteColor: body.favoriteColor,
        birthday: body.birthday,
    };
};

// * 3. Controller Functions
// GET__all contacts
contactsController.getContacts = async (req, res) => {
    //#swagger.tags = ['Contacts']
    try {
        const contacts = await getContactsCollection().find().toArray();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    } catch (error) {
        sendServerError(res, error, "Failed to retrieve contacts");
    }
};

// GET__single contact by ID
contactsController.getContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid contact ID format" });
        return;
    }
    try {
        const contactId = new ObjectId(req.params.id);
        const contact = await getContactsCollection().findOne({
            _id: contactId,
        });

        if (!contact) {
            res.status(404).json({ error: "Contact not found" });
            return;
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contact);
    } catch (error) {
        sendServerError(res, error, "Failed to retrieve contact");
    }
};

// POST__create new contact
contactsController.createContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    try {
        const response = await getContactsCollection().insertOne(
            buildContactFromBody(req.body)
        );

        if (response.acknowledged) {
            res.status(201).json({ message: "Contact created successfully" });
        } else {
            res.status(500).json({ error: "Failed to create new contact" });
        }
    } catch (error) {
        sendServerError(res, error, "Failed to create new contact");
    }
};

// POST__create multiple new contacts
contactsController.createContacts = async (req, res) => {
    //#swagger.tags = ['Contacts']
    try {
        const newContacts = req.body.map((contact) =>
            buildContactFromBody(contact)
        );
        const response = await getContactsCollection().insertMany(newContacts);

        if (response.acknowledged) {
            res.status(201).json({
                message: `${response.insertedCount} contacts created successfully`,
            });
        } else {
            res.status(500).json({ error: "Failed to create new contacts" });
        }
    } catch (error) {
        sendServerError(res, error, "Failed to create new contacts");
    }
};

// PUT__replace an entire contact by ID
contactsController.replaceContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid contact ID format" });
        return;
    }

    try {
        const newContactID = new ObjectId(req.params.id);
        const response = await getContactsCollection().replaceOne(
            { _id: newContactID },
            buildContactFromBody(req.body)
        );

        if (response.matchedCount === 0) {
            res.status(404).json({ error: "Contact not found" });
        } else {
            res.status(200).send({ message: "Contact replaced successfully" });
        }
    } catch (error) {
        sendServerError(res, error, "Failed to replace existing contact");
    }
};

// PUT__replace multiple contacts by IDs
contactsController.replaceContacts = async (req, res) => {
    //#swagger.tags = ['Contacts']
    try {
        const bulkOperations = req.body.map((contact) => {
            return {
                replaceOne: {
                    filter: { _id: new ObjectId(contact._id) },
                    replacement: buildContactFromBody(contact),
                },
            };
        });
        const response =
            await getContactsCollection().bulkWrite(bulkOperations);

        if (response.matchedCount === 0) {
            res.status(404).json({ error: "No matching contacts found" });
        } else {
            res.status(200).send({ message: "Contacts replaced successfully" });
        }
    } catch (error) {
        sendServerError(res, error, "Failed to replace existing contacts");
    }
};

// PATCH__update specific fields of a contact by ID
contactsController.updateContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid contact ID format" });
        return;
    }

    try {
        const newContactID = new ObjectId(req.params.id);
        const updatedFields = req.body;
        const response = await getContactsCollection().updateOne(
            { _id: newContactID },
            { $set: updatedFields }
        );

        if (response.matchedCount === 0) {
            res.status(404).json({ error: "Contact not found" });
        } else {
            res.status(200).send({ message: "Contact updated successfully" });
        }
    } catch (error) {
        sendServerError(res, error, "Failed to update contact");
    }
};

// PATCH__update specific fields of multiple contacts by IDs
contactsController.updateContacts = async (req, res) => {
    //#swagger.tags = ['Contacts']
    try {
        const bulkOperations = req.body.map((contact) => {
            const { _id, ...fieldsToUpdate } = contact;
            return {
                updateOne: {
                    filter: { _id: new ObjectId(_id) },
                    update: { $set: fieldsToUpdate },
                },
            };
        });
        const response =
            await getContactsCollection().bulkWrite(bulkOperations);

        if (response.matchedCount === 0) {
            res.status(404).json({ error: "No matching contacts found" });
        } else {
            res.status(200).send({ message: "Contacts updated successfully" });
        }
    } catch (error) {
        sendServerError(res, error, "Failed to update contacts");
    }
};

// DELETE__delete contact by ID
contactsController.deleteContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid contact ID format" });
        return;
    }
    try {
        const newContactID = new ObjectId(req.params.id);
        const response = await getContactsCollection().deleteOne({
            _id: newContactID,
        });

        if (response.deletedCount > 0) {
            res.status(200).send({ message: "Contact deleted successfully" });
        } else {
            res.status(404).json({ error: "Contact not found" });
        }
    } catch (error) {
        sendServerError(res, error, "Failed to delete contact");
    }
};

// DELETE__multiple contacts by IDs
contactsController.deleteContacts = async (req, res) => {
    //#swagger.tags = ['Contacts']
    try {
        const contactIDs = req.body.map((contact) => new ObjectId(contact._id));
        const response = await getContactsCollection().deleteMany({
            _id: { $in: contactIDs },
        });

        if (response.deletedCount > 0) {
            res.status(200).send({ message: "Contacts deleted successfully" });
        } else {
            res.status(404).json({ error: "No matching contacts found" });
        }
    } catch (error) {
        sendServerError(res, error, "Failed to delete contacts");
    }
};

// * 4. Export Controller Functions
module.exports = contactsController;

/*
I wanted to make a note about the .status codes for responses:
    - status(200) is used for successful GET requests where we are retrieving data from the server. It indicates that the request was successful and the server is returning the requested data in the response body.
    - status(201) is used for successful POST, PUT, PATCH, and DELETE requests where we are creating, updating, or deleting resources on the server. It indicates that the request was successful and a new resource was created (for POST) or an existing resource was updated/deleted (for PUT, PATCH, DELETE). In these cases, we also include a message in the response body to provide more information about the outcome of the request.
    - status(204) is used for successful DELETE requests where we are deleting a resource on the server. It indicates that the request was successful and the resource was deleted, but there is no content to return in the response body.
    - status(400) is used for bad requests when the client sends invalid data or the request cannot be processed due to client error. It indicates that there was an issue with the request sent by the client, such as missing required fields, invalid data formats, etc. In these cases, we include an error message in the response body to provide more information about what went wrong with the client's request.
    - status(500) is used for server errors when something goes wrong on the server side while processing the request. It indicates that there was an error and the server was unable to complete the request. In these cases, we include the error message in the response body to provide more information about what went wrong.

You will also notice that I included //#swagger.tags = ['Contacts'] in each controller function. This is a special comment that is used by the swagger-autogen package to generate the Swagger documentation for our API. By including this comment, we are tagging each endpoint with the 'Contacts' tag in the generated Swagger documentation, which helps to organize our API endpoints and make it easier for users to navigate the documentation. When we view the Swagger UI documentation, we will see a section for 'Contacts' that includes all of the endpoints related to managing contacts in our API. This is a helpful way to group related endpoints together in the documentation and improve the overall user experience when exploring our API. If I had other controllers for different resources (e.g., 'Users', 'Products', etc.), I would use different tags for those controllers to keep the documentation organized and easy to navigate.



? 1. Imports
** const mongodb = require('../data/database.js');
** const ObjectId = require('mongodb').ObjectId;
____________________________________________________
We import the necessary modules to create our contacts controller. Here's a breakdown of each import:
    - mongodb: This is our custom module that handles the connection to our MongoDB database. We will use this to access the database client and perform operations on the contacts collection.
    - ObjectId: This is a class from the mongodb package that allows us to create ObjectId instances, which are used as unique identifiers for documents in MongoDB. We will use this to convert the contact ID from the request parameters into an ObjectId instance when retrieving a single contact from the database.



? 2. Initialize Controller Object
** const contactsController = {};
____________________________________________________
Next, we create an empty object called contactsController. This object will be used to store the controller functions for handling the logic of our API endpoints related to contacts. We will add methods to this object for retrieving all contacts and retrieving a single contact by ID.



? 3. Controller Functions
____________________________________________________
We define two controller functions for handling the logic of our API endpoints related to contacts. Here's a breakdown of each function:
    ** getAll: 
    This function retrieves all contacts from the database. It uses the getDB() method from our database module to access the database client, then it calls db().collection('contacts').find() to retrieve all documents from the 'contacts' collection. The result is a cursor, so we call toArray() to convert it into an array of contacts. Finally, we set the response header to indicate that we're returning JSON, and we send the array of contacts in the response with a status code of 200 (OK).
    ** getSingle: 
    This function retrieves a single contact by ID from the database. It first converts the contact ID from the request parameters into an ObjectId instance. Then it uses the getDB() method to access the database client and calls db().collection('contacts').find({ _id: contactId }) to find the document with the matching ID in the 'contacts' collection. The result is a cursor, so we call toArray() to convert it into an array. Since we expect only one contact to be returned, we access the first element of the array (contacts[0]) and send it in the response with a status code of 200 (OK).
    ** createSingle: 
    This function creates a new contact in the database. It constructs a new contact object using the data from the request body, then it uses the getDB() method to access the database client and calls db().collection('contacts').insertOne(newContact) to insert the new contact into the 'contacts' collection. If the insertion is successful (response.acknowledged > 0), it sends a success message with a status code of 201 (Created). If there is an error, it sends an error message with a status code of 500 (Internal Server Error).
    ** createMultiple: 
    This function creates multiple new contacts in the database. It maps over the array of contacts in the request body to construct an array of new contact objects, then it uses the getDB() method to access the database client and calls db().collection('contacts').insertMany(newContacts) to insert the new contacts into the 'contacts' collection. If the insertion is successful (response.acknowledged > 0), it sends a success message with the number of contacts created and a status code of 201 (Created). If there is an error, it sends an error message with a status code of 500 (Internal Server Error).
    ** replaceSingle: 
    This function replaces an entire contact by ID in the database. It converts the contact ID from the request parameters into an ObjectId instance, constructs a new contact object using the data from the request body, then it uses the getDB() method to access the database client and calls db().collection('contacts').replaceOne({ _id: newContactID }, newContact) to replace the existing contact with the new contact. If the replacement is successful (response.modifiedCount > 0), it sends a success message with a status code of 201 (Created). If there is an error, it sends an error message with a status code of 500 (Internal Server Error).
    ** replaceMultiple: 
    This function replaces multiple contacts by their IDs in the database. It maps over the array of contacts in the request body to construct an array of bulk operations for replacing each contact, then it uses the getDB() method to access the database client and calls db().collection('contacts').bulkWrite(bulkOperations) to perform the bulk replacement. If the replacement is successful (response.modifiedCount > 0), it sends a success message with a status code of 201 (Created). If there is an error, it sends an error message with a status code of 500 (Internal Server Error).
    ** updateSingle: 
    This function updates specific fields of a contact by ID in the database. It converts the contact ID from the request parameters into an ObjectId instance, constructs an object with the fields to update from the request body, then it uses the getDB() method to access the database client and calls db().collection('contacts').updateOne({ _id: newContactID }, { $set: updatedFields }) to update the specified fields of the existing contact. If the update is successful (response.modifiedCount > 0), it sends a success message with a status code of 201 (Created). If there is an error, it sends an error message with a status code of 500 (Internal Server Error).
    ** updateMultiple: 
    This function updates specific fields of multiple contacts by their IDs in the database. It maps over the array of contacts in the request body to construct an array of bulk operations for updating each contact, then it uses the getDB() method to access the database client and calls db().collection('contacts').bulkWrite(bulkOperations) to perform the bulk update. If the update is successful (response.modifiedCount > 0), it sends a success message with a status code of 201 (Created). If there is an error, it sends an error message with a status code of 500 (Internal Server Error).
    ** deleteSingle: 
    This function deletes a contact by ID from the database. It converts the contact ID from the request parameters into an ObjectId instance, then it uses the getDB() method to access the database client and calls db().collection('contacts').deleteOne({ _id: newContactID }) to delete the document with the matching ID from the 'contacts' collection. If the deletion is successful (result.deletedCount > 0), it sends a success message with a status code of 201 (Created). If there is an error, it sends an error message with a status code of 500 (Internal Server Error).
    ** deleteMultiple: 
    This function deletes multiple contacts by their IDs from the database. It maps over the array of contacts in the request body to construct an array of ObjectId instances for the contact IDs, then it uses the getDB() method to access the database client and calls db().collection('contacts').deleteMany({ _id: { $in: contactIDs } }) to delete all documents with matching IDs from the 'contacts' collection. If the deletion is successful (result.deletedCount > 0), it sends a success message with a status code of 201 (Created). If there is an error, it sends an error message with a status code of 500 (Internal Server Error).



? 4. Export Controller Functions
** module.exports = contactsController;
____________________________________________________
Finally, we export the contactsController object so that it can be imported and used in other parts of our application, such as in our routes/contactsRoutes.js file where we will use these controller functions as handlers for our API endpoints related to contacts. This allows us to keep our controller logic organized and separate from our route definitions, following the MVC (Model-View-Controller) pattern for better code organization and maintainability.
*/
