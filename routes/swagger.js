// * 1. Import the necessary modules
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swaggerOutput.json');



// * 2. Set up the Swagger UI route
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));



// * 3. Export the router
module.exports = router;



/*
? 1. Import the necessary modules
** const router = require('express').Router();
** const swaggerUi = require('swagger-ui-express');
** const swaggerDocument = require('../swaggerOutput.json');
____________________________________________________
Here, we import the necessary modules to set up our Swagger documentation route. We import the Router class from Express to create a new router object, the swagger-ui-express package to serve the Swagger UI, and the generated Swagger documentation from swaggerOutput.json.



? 2. Set up the Swagger UI route
** router.use('api-docs', swaggerUi.serve);
** router.get('/api-docs', swaggerUi.setup(swaggerDocument));
____________________________________________________
Next, we set up the route for serving the Swagger UI. We use router.use() to serve the Swagger UI assets at the '/api-docs' path, and then we define a GET route for '/api-docs' that uses swaggerUi.setup() to serve the generated Swagger documentation. This allows us to access our API documentation by navigating to http://localhost:3000/api-docs in our browser.



? 3. Export the router
** module.exports = router;
____________________________________________________
Finally, we export the router object so that it can be imported and used in our main server file (server.js). This allows us to keep our route definitions organized and separate from the server setup code. In our main server file, we will import this router and use it to handle requests to the '/api-docs' path, allowing us to serve our API documentation using Swagger UI.
*/
