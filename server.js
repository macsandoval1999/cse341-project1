// 1. Imports
const express = require('express');
const routes = require('./routes');
const dotenv = require('dotenv');
const mongodb = require('./data/database.js');



// 2. Load environment variables & Initialize Express App
dotenv.config();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const app = express();



// 3. Middleware
app.use('/', routes);



// 4. Start the server after initializing the database
mongodb.database.initDB((err) => {
    if (err) {
        console.error('Failed to initialize database:', err);
        process.exit(1);
    }
    else {
        app.listen(port, host, () => {
            console.log(`Server is running at http://${host}:${port}`);
        });
    }
});



/*
1. Imports
const express = require('express');
const routes = require('./routes');
const dotenv = require('dotenv');
const contactsDB = require('./database/contacts.js');
____________________________________________________
First we import the necessay modules to start our server. 
Heres a breakdown of each import:
    - express: This is the Express framework which we will use to create our server and handle routing.
    - routes: This is our custom module that contains the route definitions for our API. We will use this to define the endpoints of our API.
    - dotenv: This module allows us to load environment variables from a .env file into process.env. This is useful for keeping sensitive information like database connection strings out of our source code.
    - mongodb: This is our custom module that handles the connection to our MongoDB database. We will use this to initialize the database connection before starting the server.



2. Load environment variables & Initialize Express App
dotenv.config();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const app = express();
____________________________________________________
Then we load the environment variables using dotenv.config(). This allows us the use the variables defined in our .env file throughout our application, and only needs to be configured once in the main file.
Finally, we initialize our Express application by calling express() and storing it in the app variable.



3. Middleware
app.use('/', routes);
____________________________________________________    
Next, we set up our middleware. In this case, we are using the routes module we imported earlier to handle all requests to the root path ('/'). This means that any request to our server will be handled by the route definitions in the routes module.



4. Start the server after initializing the database
mongodb.database.initDB((err) => {
    if (err) {
        console.error('Failed to initialize database:', err);
        process.exit(1);
    }
    else {
        app.listen(port, host, () => {
            console.log(`Server is running at http://${host}:${port}`);
        });
    }
});
____________________________________________________
Finally, we start the server. However, before we can start listening for requests, we need to ensure that our database connection is initialized. We call the initDB function from our mongodb module, which takes a callback function as an argument. If there is an error initializing the database, we log the error and exit the process. If the database initializes successfully, we start the server by calling app.listen() with the specified port and host, and log a message indicating that the server is running.
*/