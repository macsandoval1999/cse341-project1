# CSE341 Project 1 – Node.js Web API

This project is a Node.js REST API built with Express and MongoDB. I have commented the heck out of this project for learning and practicing web service fundamentals, including routing, validation, error handling, and API documentation.

## Project Structure

- **server.js** – Main entry point. Sets up Express, connects to MongoDB, and loads all routes.
- **routes/** – All route definitions. Each resource (like contacts) has its own route file.
- **controllers/** – Business logic for each route. Controllers handle database operations and responses.
- **middleware/** – Validation and other middleware functions that run before controllers.
- **helpers/** – Utility functions, such as custom validation helpers.
- **data/** – Database connection logic.
- **swagger.js** – Swagger/OpenAPI documentation generator.
- **routes.rest** – Example REST client requests for testing your API.

## Getting Started

1. Install dependencies:
    ```
    npm install
    ```
2. Set up your `.env` file with your MongoDB connection string (see class instructions).
3. Start the server:
    ```
    npm start
    ```
4. Test endpoints using `routes.rest` or your favorite API client (like Postman).

## Documentation & Learning

- **README1.md, README2.md, README3.md** – Each of these files contains important explanations, step-by-step guides, and notes about error handling, validation, and project updates. **Please read them in order for a full understanding of the project and its requirements.**
- **File Comments** – At the bottom of each main code file, you’ll find extra comments explaining the purpose and logic of that file. These are meant to help you learn as you read the code.

## Recent Maintenance Changes

- Added `try/catch` handling around the contact controller database operations so failed MongoDB work now returns clearer `500` responses instead of failing unpredictably.
- Added missing not-found and invalid-ID checks in the contact controller so single-item routes return clearer `400` and `404` responses.
- Tightened validation for bulk contact replacement so `PUT /contacts` now requires valid MongoDB `_id` values before controller logic runs.
- Fixed Swagger auto-generation for bulk contact routes by adjusting the contact controller so the generated docs now show array request bodies correctly again.

## Tips

- Start by reading `README1.md` for the basics, then move to `README2.md` and `README3.md` for advanced topics and recent changes.
- If you’re lost, check the comments at the bottom of each file for a quick explanation.
- The project is structured to help you learn step by step. Don’t be afraid to experiment and read the guides as you go!
