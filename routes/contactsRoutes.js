// 1. Imports
const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController.js');



// 2. Routes
router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);



// 3. Export the router
module.exports = router;



/*
1. Imports
const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController.js');
____________________________________________________
We import the necessary modules to define our routes for the contacts API. Here's a breakdown of each import:
    - express: This is the Express framework which we will use to create our router and define our routes.
    - router: We create a new router object using express.Router(). This allows us to define routes that will be handled by this router, and then we can export it to be used in our main server file (server.js).
    - contactsController: This is our custom module that contains the controller functions for handling the logic of our API endpoints. We will use these functions as the handlers for our routes, allowing us to separate the route definitions from the business logic of our application.



2. Routes
router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);
____________________________________________________
Next, we define the routes for our contacts API. Here's a breakdown of each route:
    - The first route is a GET route for the root endpoint ('/'). When a client makes a GET request to this endpoint, the server will call the getAll function from the contactsController, which will retrieve all contacts from the database and return them in the response.
    - The second route is a GET route for the '/:id' endpoint. The ':id' part is a route parameter that allows us to capture the ID of a specific contact. When a client makes a GET request to this endpoint with a specific ID (e.g., '/12345'), the server will call the getSingle function from the contactsController, which will retrieve the contact with that specific ID from the database and return it in the response.



3. Export the router
module.exports = router;
____________________________________________________
Finally, we export the router object so that it can be imported and used in our main server file (server.js). This allows us to keep our route definitions organized and separate from the server setup code. In our main server file, we will import this router and use it to handle requests to the '/contacts' path, allowing us to modularize our route definitions and keep our code organized.
*/