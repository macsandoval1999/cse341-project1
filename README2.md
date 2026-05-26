# cse341-project1 Information prior to Part 2

## MongoDB and Mongoose

mongodb alone means you use the official MongoDB Node.js driver directly. mongoose means you still use MongoDB underneath, but through an ODM layer that adds models, schemas, validation, middleware, and some convenience features.

### Core difference
With mongodb:
    You talk directly to collections and documents.
    You write queries like db.collection('contacts').findOne(...).
    MongoDB itself is flexible, so your app is responsible for structure and validation.

With mongoose:
    You define a schema and a model first.
    You query through the model, like Contact.findById(...).
    Mongoose adds validation, type casting, defaults, hooks, timestamps, and helpers like populate().
    
### What changes in your code
Using mongodb directly usually looks like this:
    ```
    const { MongoClient, ObjectId } = require('mongodb');
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db('project1');
    const contacts = db.collection('contacts');
    const contact = await contacts.findOne({ _id: new ObjectId(id) });
    ```

Using mongoose looks more like this:
    ```
    const mongoose = require('mongoose');
    await mongoose.connect(process.env.MONGODB_URI);
    const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true }
    }, { timestamps: true });
    const Contact = mongoose.model('Contact', contactSchema);
    const contact = await Contact.findById(id);
    ```

### Main practical differences
mongodb:
    Less abstraction
    More control
    Usually simpler for small CRUD apps
    You handle validation and structure yourself
    You often manually use ObjectId

mongoose:
    More abstraction
    Easier to keep data consistent
    Better for apps with clear data models
    Built-in validation and defaults
    Automatic casting, middleware, virtuals, and populate

### What actually changes in a project
If you switch from mongodb to mongoose, you typically change:
    1. Connection setup
    2. Data access layer from db.collection(...) to models
    3. Validation from controller/manual checks into schemas
    4. Update/create code to use new Model() or Model.create()
    5. Some query syntax, though it stays similar

### Example:
Direct driver:
    ```
    await db.collection('contacts').insertOne({
    firstName: 'Marco',
    email: 'marco@example.com'
    });
    ```

Mongoose:
    ```
    await Contact.create({
    firstName: 'Marco',
    email: 'marco@example.com'
    });
    ```

### When to use which
Use mongodb if:
    You want minimal abstraction
    You’re learning core MongoDB behavior
    Your app is small and straightforward
    You want full control over queries and data shape

Use mongoose if:
    You want schema-based models
    You need built-in validation
    You want cleaner code for larger apps
    You expect the data model to grow over time

### Short version
mongodb = direct database driver.
mongoose = an extra layer on top of MongoDB that makes modeling and validation easier, but adds abstraction.