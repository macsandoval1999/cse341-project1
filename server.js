// * 1. Imports
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongodb = require('./data/database.js');



// * 2. Load environment variables & Initialize Express App
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();



// * 3. Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    next();
});


// * 4. Routes
app.use('/', routes);



// * 5. Start the server after initializing the database
mongodb.database.initDB((err) => {
    if (err) {
        console.error('Failed to initialize database:', err);
        process.exit(1);
    }
    else {
        app.listen(port, () => {
            console.log(`Server is running on port http://localhost:${port}`);
        });
    }
});



/*
? 1. Imports
** const express = require('express');
** const dotenv = require('dotenv');
** const bodyParser = require('body-parser');
** const routes = require('./routes');
** const mongoDB = require('./data/database.js');
____________________________________________________
First we import the necessay modules to start our server. 
Heres a breakdown of each import:
    - express: This is the Express framework which we will use to create our server and handle routing.
    - dotenv: This module allows us to load environment variables from a .env file into process.env. This is useful for keeping sensitive information like database connection strings out of our source code.
    - body-parser: This middleware allows us to parse incoming request bodies in a middleware before our handlers, making the req.body property available. We will use this to handle JSON payloads in our API requests.
    - routes: This is our custom module that contains the route definitions for our API. We will use this to define the endpoints of our API.
    - mongodb: This is our custom module that handles the connection to our MongoDB database. We will use this to initialize the database connection before starting the server.



? 2. Load environment variables & Initialize Express App
** dotenv.config();
** const port = process.env.PORT || 3000;
** const host = process.env.HOST || 'localhost';
** const app = express();
____________________________________________________
Then we load the environment variables using dotenv.config(). This allows us the use the variables defined in our .env file throughout our application, and only needs to be configured once in the main file.
Finally, we initialize our Express application by calling express() and storing it in the app variable.



? 3. Middleware
** app.use(bodyParser.json());
** app.use((req, res, next) => {
**     res.setHeader('Access-Control-Allow-Origin', '*');
**     res.setHeader(
**         'Access-Control-Allow-Headers',
**         'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
**     );
**     res.setHeader(
**         'Access-Control-Allow-Methods',
**         'GET, POST, PUT, DELETE, OPTIONS'
**     );
**     next();
** });
____________________________________________________    
Next, we set up our middleware. Heres a breakdown of the middleware we are using:
    - bodyParser.json(): This middleware parses incoming request bodies in JSON format and makes the data available in req.body. This is essential for handling API requests that send data in the request body, such as POST and PUT requests.
    - CORS Headers: The second middleware function sets the necessary headers to allow Cross-Origin Resource Sharing (CORS). This is important for allowing our API to be accessed from different origins (e.g., from a frontend application running on a different domain). The headers we set include:
        - Access-Control-Allow-Origin: 
        This allows requests from any origin ('*'). In a production environment, you may want to restrict this to specific origins for security reasons.
        - Access-Control-Allow-Headers: 
        This specifies the allowed headers in incoming requests. We include common headers like 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', and a custom header 'Z-Key' that we might use for authentication or other purposes.
        - Access-Control-Allow-Methods: 
        This specifies the allowed HTTP methods for incoming requests. We allow GET, POST, PUT, DELETE, and OPTIONS methods.
    Finally, we call next() to pass control to the next middleware function in the stack or to the route handler if there are no more middleware functions to execute.



? 4. Routes
** app.use('/', routes);
____________________________________________________
Next, we set up our routes. In this case, we are using the routes module we imported earlier to handle all requests to the root path ('/'). This means that any request to our server will be handled by the route definitions in the routes module. The routes module will contain the specific endpoints for our API, such as GET /contacts, POST /contacts, etc., and will use the controller functions defined in our controllers/contactsController.js file to handle the logic for each endpoint.



? 5. Start the server after initializing the database
** mongodb.database.initDB((err) => {
**     if (err) {
**         console.error('Failed to initialize database:', err);
**         process.exit(1);
**     }
**     else {
**         app.listen(port, () => {
**             console.log(`Server is running on port ${port}`);
**         });
**     }
** });
____________________________________________________
Finally, we start the server. However, before we can start listening for requests, we need to ensure that our database connection is initialized. We call the initDB function from our mongodb module, which takes a callback function that will be called once the database connection is established. If there is an error during initialization, we log the error and exit the process. If the initialization is successful, we start the server by calling app.listen() and passing in the port number. We also log a message to indicate that the server is running.
*/