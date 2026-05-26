# CSE341 Project 1 - PART 2

## Error Handling

### Step 1: Change the swagger json for local testing

When we last left the project, we deployed to Render so we needed to change the host and schemes for render. Change them back to say localhost://3000 and http.

    Change this:
    ```
    "swagger": "2.0",
    "info": {
        "title": "CSE341 Project 1 API",
        "description": "API for CSE341 Project 1",
        "version": "1.0.0"
    },
    "host": "cse340-web-activity.onrender.com",
    "basePath": "/",
    "schemes": ["https"],...
    ```

    To this:
    ```
    "swagger": "2.0",
    "info": {
        "title": "CSE341 Project 1 API",
        "description": "API for CSE341 Project 1",
        "version": "1.0.0"
    },
    "host": "localhost:3000",
    "basePath": "/",
    "schemes": ["http"],...
    ```

## Validation

### What we changed since the last push

- Added a small JSON body error response in the server so malformed JSON now returns `400 Invalid JSON body` instead of failing less clearly.
- Added a general Express error response and fixed the global process error logging so unexpected errors are logged without referencing an undefined variable.
- Added a database startup check for a missing `MONGODB_URI` environment variable.
- Kept the existing validation style, but added validation for bulk delete requests and stronger checks for bulk update requests.
- Added safer controller error handling with `try/catch` blocks around database work.
- Added better status handling for common cases like invalid IDs, missing contacts, and bulk operations that do not match any documents.

### Notes for future error handling

- Add error handling closest to where something can fail. In this project, that usually means around MongoDB calls and around request body parsing.
- Use `400` when the client sends bad input, `404` when the resource does not exist, and `500` when the server fails unexpectedly.
- Prefer small helper functions for repeated error responses so your controllers stay readable.
- When you add a new route, decide three things right away: what input is required, what can throw, and what status code should be returned when nothing is found.

### Notes for future validation

- Keep validation in middleware when possible so controllers can focus on database work.
- Validate array requests separately from single-object requests. Bulk routes usually need both an array check and per-item checks.
- For MongoDB IDs, validate the 24-character ObjectId format before trying to create a new `ObjectId`.
- For PATCH routes, require at least one real field to update so the route does not accept empty updates.
- As you learn more, a good next step is to make validation reusable by extracting shared rules for contact fields and shared rules for `_id`.

## Step-by-Step Guide for Adding Error Handling and Validation

### Goal

The goal is to add validation before bad data reaches the controller, and add error handling anywhere the server, database, or request data might fail. In this project, that means keeping validation mostly in middleware and keeping database error handling mostly in controllers and server setup.

### Step 1: Start with the route and ask what the route accepts

Before writing or changing a route, ask these questions:

- Is this route receiving a single object or an array?
- Does it need a route parameter like `:id`?
- Which fields are required?
- Which fields are optional?
- Is this a full replace route like `PUT`, or a partial update route like `PATCH`?

This helps you decide what validation rules belong in middleware before the controller runs.

### Step 2: Add validation for request bodies first

Request body validation should usually happen in middleware.

What should have validation in this project:

- `POST /contacts`: validate required contact fields.
- `POST /contacts/bulk`: validate that the body is a non-empty array and that each item has the required contact fields.
- `PUT /contacts/:id`: validate the body like a full contact replacement.
- `PUT /contacts`: validate that the body is a non-empty array and that each item has `_id` plus the full replacement fields.
- `PATCH /contacts/:id`: validate that the body is not empty and contains only valid updatable fields.
- `PATCH /contacts`: validate that the body is a non-empty array and that each item has `_id` plus at least one field to update.
- `DELETE /contacts`: validate that the body is a non-empty array and that each item has a valid `_id`.

Good rule to remember:

- Use middleware validation for request shape and field rules.
- Use controller checks for route params, database results, and database failures.

### Step 3: Validate route params like `:id`

If a route uses `req.params.id`, validate it before creating a new `ObjectId`.

For this project, these routes should check the ID format:

- `GET /contacts/:id`
- `PUT /contacts/:id`
- `PATCH /contacts/:id`
- `DELETE /contacts/:id`

Why:

- If the ID is not a valid MongoDB ObjectId, creating `new ObjectId(req.params.id)` can throw.
- That is a client input problem, so it should return `400`, not `500`.

### Step 4: Add `try/catch` around database work

Any controller that talks to MongoDB should use `try/catch`.

In this project, that includes:

- reading contacts
- creating contacts
- replacing contacts
- updating contacts
- deleting contacts

Why:

- The database could be unavailable.
- The query could fail.
- ObjectId conversion or bulk operations could throw.

Pattern to follow:

1. Validate the request first.
2. Enter `try`.
3. Run the database operation.
4. Return the success response.
5. Use `catch` to log the error and return a `500` response.

### Step 5: Return the right status code for the situation

Use response codes consistently.

Simple guide:

- `200`: successful read, update, replace, or delete.
- `201`: successful create.
- `400`: bad route parameter or malformed JSON.
- `404`: valid request, but no matching contact was found.
- `412`: validation failed in middleware.
- `500`: unexpected server or database error.

This makes your API easier to test and easier to understand.

### Step 6: Handle malformed JSON in the server

Some errors happen before the route or controller ever runs.

Example:

- If the client sends broken JSON, `bodyParser.json()` will fail before your route handler is reached.

That is why server-level error handling is useful. It catches invalid JSON and returns a clean `400` response instead of a confusing crash or generic error.

### Step 7: Add one small helper when you repeat logic

If the same logic appears more than once, make a small helper instead of repeating it everywhere.

Examples in this project:

- building a contact object from `req.body`
- sending a repeated server error response
- reusing the same contact validation rules

Keep helpers small. The point is not to make the project more advanced than needed. The point is just to avoid repeating the same code too many times.

### Step 8: Decide what belongs in validation and what belongs in error handling

Validation is for checking whether the request is acceptable before running the main logic.

Validation examples:

- missing `firstName`
- invalid email format
- empty request body
- request body is not an array when a bulk route expects an array
- invalid `_id` format in bulk items

Error handling is for dealing with failures while the server is doing work.

Error handling examples:

- database connection failure
- insert/update/delete operation failure
- unexpected thrown error
- invalid JSON parsing at the server level

Easy way to think about it:

- If the client sent bad input, it is usually validation.
- If the server failed while processing good input, it is usually error handling.

### Step 9: Build each new route in this order

When adding a new route later, follow this order:

1. Write the route.
2. Decide what request data it needs.
3. Add middleware validation for the body.
4. Add param validation if the route uses `:id`.
5. Add the controller logic inside `try/catch`.
6. Return the correct success status.
7. Return `404` if nothing matched.
8. Test one good request and one bad request.

This order keeps the code simple and reduces confusion.

### Step 10: Test both the happy path and the failure path

For every route, test at least two things:

1. A valid request that should succeed.
2. An invalid request that should fail clearly.

Examples:

- valid `POST` with all required fields
- invalid `POST` missing email
- valid `GET /contacts/:id` with a real ID
- invalid `GET /contacts/:id` with a bad ID format
- valid bulk `PATCH` with `_id` and one changed field
- invalid bulk `PATCH` with `_id` only and no field to update

Once you verify everything works, make sure to change the swagger.json file back to render and https.

### Quick Checklist for Future Routes

Before finishing a route, ask:

- Did I validate the request body if one is being sent?
- Did I validate `:id` if the route uses one?
- Did I wrap database work in `try/catch`?
- Did I return `404` when nothing was found?
- Did I return `400` or `412` for bad input?
- Did I leave `500` only for real server-side problems?

### Short Version to Remember

Use validation to stop bad input early.
Use error handling to catch failures while the server is working.
Put validation in middleware when possible.
Put database `try/catch` blocks in controllers.
Use clear status codes so you can tell exactly what went wrong.
