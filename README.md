# cse341-project1
CSE341 Project 1 for Weeks 1 &amp; 2

# Step 1 
Set Up Github and Initialize Node Project

    1. After creating the github repository, clone the repository.

    2. Check it you have node with node --v, and npm with npm --v.

    3. Edit your package.json file to your info.

# Step 2 
Push to Github and start with Express

    1. You know how to push to github :)

    2. npm i express --save

    3. Set up dev server, npm i browser-sync nodemon concurrently --save-dev

    4. Make scripts for dev server

    5. Create .env and .gitignore. node_modules and .env should be named in ignore file. .env file should hold any keys or env variables nobody else should see.

    6. Also install dotenv to actually configure .env in files that need it: npm i dotenv --save-dev

    7. Create Routes folder with index.js that will be main exported router that holds other router objects. (Look at index.js for notes)

    8. Create server.js, (Look at file for notes)

# Step 3 
Install MongoDB and Import Data

    1. In PC download MongoDB Community Server which also get mongoDB Compass. 
    
    2.In mongoDB Atlas (the website) go to your cluster and click connect. If you need to create a user go to database access. You need a username and password for each user.

    3. Also make sure to add your ip address as well in network access. Also add 0.0.0.0/0 so render can access the database as well. In an actual production database, DO NOT ADD 0.0.0.0/0

    4. If you havent done so, add your data manually into your database in mongoDB

# Step 4 
Connect your node project to MongoDB

    1. install the mongoDB driver with: npm i mongodb --save

    2. Create a database folder and add a file for the collection. (Look at server.js and database folder for notes)

    3. Add the MONGODB_URI database connection to the env file

# Step 5
Add the Get and GetAll endpoints

    1.
