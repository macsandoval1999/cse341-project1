// 1. Imports
const express = require('express');
const contactsRoutes = require('./contactsRoutes.js');



// 2. Initialize Router Object
const router = express.Router();



// 3. Routes
router.get('/', (req, res) => {
    res.send('Welcome to the CSE341 Project 1 API!');
});

router.use('/contacts', contactsRoutes);



// 4. Export the router
module.exports = router;



/*
1. Imports
const express = require('express');
const routes = require('./contactsRoutes.js');
____________________________________________________
The index file serves as the main router which will import other routers (like contactsRoutes) and combine them into a single router that can be used in our main server file (server.js).
Here's a breakdown of the imports:
    - We import the express framework so we can access the router class and create a router object.
    - We also import our contactsRoutes module, which contains the route definitions for our contacts API endpoints. This allows us to modularize our route definitions and keep our code organized.



2. Initialize Router Object
const router = express.Router();
____________________________________________________
Next, we create a new router object using express.Router(). We can attach routes to this router object, and then export it to be used in our main server file (server.js).



3. Routes
router.get('/', (req, res) => {
    res.send('Welcome to the CSE341 Project 1 API!');
});
router.use('/contacts', contactsRoutes);
____________________________________________________
As the main router, we define the the beginning portions of our routes here. Heres a breakdown of the routes:
    - The first route is a simple GET route for the root endpoint ('/'). When a client makes a GET request to this endpoint, the server will respond with a welcome message. This is just a placeholder route, and we can add more routes later to handle different API endpoints.
    - The second route uses router.use() to mount the contactsRoutes router at the '/contacts' path. This means that any routes defined in contactsRoutes will be accessible under the '/contacts' path. For example, if contactsRoutes defines a GET route for '/', it will be accessible at '/contacts/' in our main API. This allows us to keep our route definitions modular and organized, as we can define all the routes related to contacts in the contactsRoutes module and then mount it in our main router.



4. Export the router
module.exports = router;
____________________________________________________
Finally, we export the router object so that it can be imported and used in our main server file (server.js). This allows us to keep our route definitions organized and separate from the server setup code.
*/