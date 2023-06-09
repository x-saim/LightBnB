
# LightBnb Project

Welcome to LightBnb! This is a simple multi-page application that serves as a clone of Airbnb. LightBnb utilizes server-side JavaScript and SQL queries to retrieve and display information on web pages.

## App Views

### Entity Relationship Diagram
![ERD](https://github.com/x-saim/LightBnB/blob/master/docs/LightBnb_ERD.png?raw=true)

### Reservations View
![Reservations](https://github.com/x-saim/LightBnB/blob/master/docs/Create_listing.png?raw=true)

### Search Form
![Create Listing](https://github.com/x-saim/LightBnB/blob/master/docs/Search_form.png?raw=true)

## Getting Started

### Prerequisites
- Make sure you have Postgres SQL installed on your system.
- Start the Postgres SQL server by running the command `startpostgres` and `psql`.

### Database Setup

#### Migrations
1. Connect to the lightbnb database by using the command `\c` lightbnb in your Postgres SQL client: `\c lightbnb`
2. Inject the database queries by executing the following commands:

- `\i migrations/01_schema.sql`
- `\i migrations/02_schema.sql`

This will create the necessary tables and set up the schema for the LightBnB application.

3. Before moving on, make sure all of the tables exist in the database by typing `\dt` at the psql prompt.

#### Seeds & Data

1. The repo contains preloaded seed files that include sample data. Run the seed files by inputting the following command in your CLI: `\i seeds/01_seeds.sql` and `\i seeds/02_seeds.sql`.

### Running the Server

1. Change the directory to the LightBnB_WebApp-master folder. Make sure to replace LightBnB_WebApp-master with the correct directory name if it differs in your project.
2. Start the server by running the following command in the command line interface (CLI): `npm run local`

This will start the LightBnB server and make the application accessible through your browser at http://localhost:3000/.

## Dependencies
The LightBnb project has the following dependencies:

- bcrypt (version 3.0.6): A library used for password hashing and authentication.
- cookie-session (version 1.3.3): A middleware that enables session handling and cookie management.
- express (version 4.17.1): A fast and minimalist web application framework for Node.js.
- nodemon (version 1.19.1): A utility that automatically restarts the server when file changes are detected, facilitating development.
- pg (version 8.11.0): A PostgreSQL database client for Node.js, allowing interaction with the database.