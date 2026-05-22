// * 1. Imports
const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController.js');



// * 2. Routes
// GET__all contacts
router.get('/', contactsController.getAll);

// GET__single contact by ID
router.get('/:id', contactsController.getSingle);

// POST__create new contact
router.post('/', contactsController.createSingle);

// POST__create multiple new contacts
router.post('/bulk', contactsController.createMultiple);

// PUT__replace an entire contact by ID
router.put('/:id', contactsController.replaceSingle);

// PUT__replace multiple contacts by IDs
router.put('/', contactsController.replaceMultiple);

// PATCH__update specific fields of a contact by ID
router.patch('/:id', contactsController.updateSingle);

// PATCH__update specific fields of multiple contacts by IDs
router.patch('/', contactsController.updateMultiple);

// DELETE__delete contact by ID
router.delete('/:id', contactsController.deleteSingle);

// DELETE__multiple contacts by IDs
router.delete('/', contactsController.deleteMultiple);



// * 3. Export the router
module.exports = router;



/*
? 1. Imports
** const express = require('express');
** const router = express.Router();
** const contactsController = require('../controllers/contactsController.js');
____________________________________________________
We import the necessary modules to define our routes for the contacts API. Here's a breakdown of each import:
    - express: This is the Express framework which we will use to create our router and define our routes.
    - router: We create a new router object using express.Router(). This allows us to define routes that will be handled by this router, and then we can export it to be used in our main server file (server.js).
    - contactsController: This is our custom module that contains the controller functions for handling the logic of our API endpoints. We will use these functions as the handlers for our routes, allowing us to separate the route definitions from the business logic of our application.



? 2. Routes
** router.get('/', contactsController.getAll);
** router.get('/:id', contactsController.getSingle);
** router.post('/', contactsController.createSingle);
** router.post('/bulk', contactsController.createMultiple);
** router.put('/:id', contactsController.replaceSingle);
** router.put('/', contactsController.replaceMultiple);
** router.patch('/:id', contactsController.updateSingle);
** router.patch('/', contactsController.updateMultiple);
** router.delete('/:id', contactsController.deleteSingle);
** router.delete('/', contactsController.deleteMultiple);
____________________________________________________
Next, we define the routes for our contacts API. Each route corresponds to a specific HTTP method and endpoint, and is associated with a controller function that will handle the logic for that route. Here's a breakdown of the routes:
    - GET /: This route will return all contacts. It uses the getAll controller function to handle the request.
    - GET /:id: This route will return a single contact by its ID. It uses the getSingle controller function to handle the request.
    - POST /: This route will create a new contact. It uses the createSingle controller function to handle the request.
    - POST /bulk: This route will create multiple new contacts. It uses the createMultiple controller function to handle the request.
    - PUT /:id: This route will replace an entire contact by its ID. It uses the replaceSingle controller function to handle the request.
    - PUT /: This route will replace multiple contacts by their IDs. It uses the replaceMultiple controller function to handle the request.
    - PATCH /:id: This route will update specific fields of a contact by its ID. It uses the updateSingle controller function to handle the request.
    - PATCH /: This route will update specific fields of multiple contacts by their IDs. It uses the updateMultiple controller function to handle the request.
    - DELETE /:id: This route will delete a contact by its ID. It uses the deleteSingle controller function to handle the request.
    - DELETE /: This route will delete multiple contacts by their IDs. It uses the deleteMultiple controller function to handle the request.

    
    
? 3. Export the router
** module.exports = router;
____________________________________________________
Finally, we export the router object so that it can be imported and used in our main server file (server.js). This allows us to keep our route definitions organized and separate from the server setup code. In our main server file, we will import this router and use it to handle requests to the '/contacts' path, allowing us to modularize our route definitions and keep our code organized.
*/