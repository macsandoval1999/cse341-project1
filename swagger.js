// * 1. Import the swagger-autogen module
const swaggerAutogen = require('swagger-autogen')();



// * 2. Define the documentation object (optional)
const doc = {
    info: {
        title: 'CSE341 Project 1 API',
        description: 'API for CSE341 Project 1',
    },
    host: 'cse340-web-activity.onrender.com',
    schemes: ['https']
};



// * 3. Specify the output file and the endpoints files
const outputFile = './swaggerOutput.json';
const endpointsFiles = ['./routes/index.js'];



// * 4a. Generate the swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc)
    .then(() => {
        console.log('Swagger documentation generated successfully.');
    })
    .catch((error) => {
        console.error('Failed to generate swagger documentation:', error);
        process.exit(1);
    });



/*
? 1. Import the swagger-autogen module
** const swaggerAutogen = require('swagger-autogen')();
__________________________________________________
Here, we import the swagger-autogen module and create an instance of it. This package allows us to automatically generate Swagger documentation based on our API endpoints.



? 2. Define the documentation object (optional)
** const doc = {
**  info: {
**       title: 'CSE341 Project 1 API',
**       description: 'API for CSE341 Project 1',
**  },
**  host: 'localhost:3000',
**  schemes: ['http', 'https']
** };
_________________________________________________
This object contains metadata about our API, such as the title, description, host, and supported schemes. This information will be included in the generated Swagger documentation. 
Heres a breakdown of the properties:
- info: Contains the title and description of the API.
- host: Specifies the host and port where the API is running.
- schemes: Lists the supported protocols (HTTP and HTTPS in this case). HTTP is included for local development, while HTTPS is included for production environments. You will want to remove the HTTP scheme when deploying to production to ensure secure communication. HTTP must come before HTTPS in the array to ensure that the generated documentation defaults to HTTP for local development, while still allowing for HTTPS in production.



? 3. Specify the output file and the endpoints files
** const outputFile = './swagger.json';
** const endpointsFiles = ['./routes/index.js'];
__________________________________________________
Here, we define the output file where the generated Swagger documentation will be saved (swagger.json) and the file(s) that contain our API endpoints (index.js in the routes directory). The swagger-autogen package will scan these files to extract information about the API endpoints and generate the documentation accordingly.



? 4. Generate the swagger documentation
** swaggerAutogen(outputFile, endpointsFiles, doc);
__________________________________________________
Finally, we call the swaggerAutogen function, passing in the output file, the endpoints files, and the documentation object. This will generate the Swagger documentation based on the defined API endpoints and save it to the specified output file. You can then use this generated documentation to create interactive API documentation using tools like Swagger UI or ReDoc.
*/