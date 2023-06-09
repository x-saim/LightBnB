
# LightBnb Project

Welcome to LightBnb! This is a simple multi-page application that serves as a clone of Airbnb. LightBnb utilizes server-side JavaScript and SQL queries to retrieve and display information on web pages.

## App Use

This app provides functionality related to property rentals and reservations. It consists of the following pages:

* Search: This page allows users to search for available properties based on various filters such as city, price range, and minimum rating. Users can enter their search criteria and view a list of matching properties.

* Create Listing: This page enables property owners to create new listings for their properties. Owners can enter details about the property, such as title, description, location, pricing, and amenities. After submitting the listing, it becomes available for users to search and book.

* My Listings: This page displays a list of properties owned by the currently logged-in user. Owners can manage their listings, including editing property details, updating availability, and removing listings if needed.

* My Reservations: This page provides a summary of reservations made by the currently logged-in user. Users can view details of each reservation, including the property, reservation dates, and any associated ratings or reviews.

* Log In: The Log In page is where users can authenticate themselves by logging into their existing accounts. 

* Sign Up: The Sign Up page allows new users to create an account and join the app's community.

* Log Out: This functionality allows users to securely log out of the application, terminating their session and ensuring their privacy.

Overall, this app facilitates property searching, listing creation, and reservation management for both property owners and users interested in renting properties.

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
2. Inject the database queries to create tables in the database by executing the following commands:

- `\i migrations/01_schema.sql`
- `\i migrations/02_schema.sql`

This will create the necessary tables and set up the schema for the LightBnB application.

3. Before moving on, make sure all of the tables exist in the database by typing `\dt` at the psql prompt.

#### Seeds & Data

1. The repo contains preloaded seed files that include sample data. Run the seed files by inputting the following command in your CLI: `\i seeds/01_seeds.sql` and `\i seeds/02_seeds.sql`.

### Running the Server

1. Download the project zip file from https://github.com/lighthouse-labs/LightBnB_WebApp.

Once the project has downloaded:
- Extract and drag the extracted LightBnB_WebApp folder into your lightbnb folder.
- `cd` into the LightBnB_WebApp directory.
- Install any dependencies with `npm i`.

2. Change the directory to the LightBnB_WebApp-master folder. Make sure to replace LightBnB_WebApp-master with the correct directory name if it differs in your project.
3. Start the server by running the following command in the command line interface (CLI): `npm run local`

This will start the LightBnB server and make the application accessible through your browser at http://localhost:3000/.

* Note: You may need to have npx installed first. `npm install -g npx`

## Dependencies
The LightBnb project has the following dependencies:

- bcrypt (version 3.0.6): A library used for password hashing and authentication.
- cookie-session (version 1.3.3): A middleware that enables session handling and cookie management.
- express (version 4.17.1): A fast and minimalist web application framework for Node.js.
- nodemon (version 1.19.1): A utility that automatically restarts the server when file changes are detected, facilitating development.
- pg (version 8.11.0): A PostgreSQL database client for Node.js, allowing interaction with the database.