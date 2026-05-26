# cse341-project1 PART 1

CSE341 Project 1 for Weeks 1 and 2. This project is a small Express API connected to MongoDB Atlas. It exposes two contact endpoints:

- `GET /contacts`
- `GET /contacts/:id`

The root route `/` returns a simple welcome message.

## Tech Stack

- Node.js
- Express
- MongoDB Node.js Driver
- dotenv
- nodemon for development

## Project Structure

```text
cse341-project1/
|-- controllers/
|   |-- contactsController.js
|-- data/
|   |-- database.js
|-- routes/
|   |-- contactsRoutes.js
|   |-- index.js
|-- .env
|-- .gitignore
|-- package.json
|-- README.md
|-- server.js
```

## Prerequisites

Before building or running this app, make sure you have:

- Node.js installed
- npm installed
- A MongoDB Atlas cluster or local MongoDB instance
- A MongoDB database with a `contacts` collection
- Git installed

Check your versions with:

```bash
node -v
npm -v
```

## Step 1: Create the Repository and Initialize the Project

1. Create a GitHub repository.
2. Clone it locally.

```bash
git clone https://github.com/<your-username>/cse341-project1.git
cd cse341-project1
```

3. Initialize Node.js if you are starting from scratch.

```bash
npm init -y
```

4. Update `package.json` with your project information.

## Step 2: Install Dependencies

Install the exact packages used by this app:

```bash
npm install express mongodb dotenv
npm install --save-dev nodemon
```

The current project uses this start script:

```json
"scripts": {
  "start": "node server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

If you want automatic reload during development, you can run:

```bash
npx nodemon server.js
```

## Step 3: Add Environment Variables

Create a `.env` file in the root of the project.

Example:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
PORT=3000
```

Important notes:

- `MONGODB_URI` is required for this app to start.
- The connection string should include the database name because this project calls `client.db()` without passing a name.
- `PORT` is optional locally because the app defaults to `3000`.

## Step 4: Update .gitignore

Make sure your `.gitignore` contains at least:

```gitignore
node_modules
.env
```

This prevents dependencies and secrets from being committed.

## Step 5: Create the App Files

To create this exact app from scratch, create the following folders and files:

- `controllers/contactsController.js`
- `data/database.js`
- `routes/index.js`
- `routes/contactsRoutes.js`
- `server.js`

What each part does:

- `server.js` creates the Express app, loads environment variables, connects to MongoDB, and starts the server.
- `routes/index.js` defines the root route and mounts the contacts routes.
- `routes/contactsRoutes.js` defines `GET /contacts` and `GET /contacts/:id`.
- `controllers/contactsController.js` contains the logic for retrieving contacts.
- `data/database.js` initializes and shares the MongoDB client connection.

## Step 6: Set Up MongoDB

This app expects a MongoDB database with a collection named `contacts`.

If you are using MongoDB Atlas:

1. Create a cluster.
2. Create a database user under Database Access.
3. Add your current IP address under Network Access.
4. Add `0.0.0.0/0` only if you need a deployed service such as Render to reach your database.
5. Copy your connection string and place it in `.env` as `MONGODB_URI`.

Important:

- For a real production app, do not leave `0.0.0.0/0` open unless you fully understand the security tradeoff.
- The database name in the connection string should match the database that contains your `contacts` collection.

## Step 7: Add Contact Data

Insert documents into the `contacts` collection before testing the API.

You can do this with MongoDB Compass or the Atlas web UI.

Example document shape:

```json
{
    "firstName": "Marco",
    "lastName": "Sandoval",
    "email": "marco@example.com",
    "favoriteColor": "Blue",
    "birthday": "1999-01-01"
}
```

Your field names can vary, but each document will need a valid MongoDB `_id` so the single-contact route can retrieve it.

## Step 8: Start the Server

Run the app with:

```bash
npm start
```

If the database connection succeeds, the server starts on the port from `.env` or on port `3000`.

You should see a message similar to:

```text
Server is running on port 3000
```

## Step 9: Test the Routes

Test these endpoints in a browser, Postman, or Thunder Client:

### Root Route

```text
GET /
```

Expected response:

```text
Welcome to the CSE341 Project 1 API!
```

### Get All Contacts

```text
GET /contacts
```

Example local URL:

```text
http://localhost:3000/contacts
```

### Get One Contact by ID

```text
GET /contacts/:id
```

Example local URL:

```text
http://localhost:3000/contacts/665f2a6f6f5a2d0d9f2d1234
```

Use a real `_id` value from one of your MongoDB documents.

## Step 10: Deploy and Test Online

If your class requires deployment, Render works well for this project.

Basic deployment steps:

1. Push your finished project to GitHub.
2. Create a new Web Service in Render.
3. Connect your GitHub repository.
4. Use `npm install` as the build command.
5. Use `npm start` as the start command.
6. Add `MONGODB_URI` as an environment variable in Render.
7. If needed, allow Render to access MongoDB Atlas by adding `0.0.0.0/0` in Atlas network access.
8. After deployment, test your deployed routes in the browser or Postman.

## API Summary

| Method | Route           | Description                          |
| ------ | --------------- | ------------------------------------ |
| GET    | `/`             | Returns a welcome message            |
| GET    | `/contacts`     | Returns all contacts                 |
| GET    | `/contacts/:id` | Returns one contact by MongoDB `_id` |

## Notes

- This project currently supports read-only routes for contacts.
- There are no POST, PUT, or DELETE routes in this version.
- The app will fail on startup if `MONGODB_URI` is missing or invalid.
- The app connects to MongoDB before starting the Express server.

## Running This Existing Repo

If you already have this repository cloned and only need to run it:

```bash
npm install
npm start
```

Just make sure your `.env` file exists first.
