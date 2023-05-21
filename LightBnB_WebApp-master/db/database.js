const properties = require("./json/properties.json");
const users = require("./json/users.json");

//Connect to the lightbnb database using PostgreSQL
const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function(email) {
  return new Promise((resolve, reject) => {
    const queryParams = [email];
    let queryStr = `
      SELECT *
      FROM users
      WHERE email = $1;
      `;

    pool
    .query(queryStr,queryParams)
    .then(result => {
        let user = result.rows[0];
        if (user.email.toLowerCase() === email.toLowerCase()) {
          resolve(user);
        } else {
          user = null;
          resolve(user);
        }
      })
      .catch(error => reject(error));
  });
  
};


/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return new Promise((resolve, reject) => {
    const queryParams = [id];
    let queryStr = `
      SELECT *
      FROM users
      WHERE id = $1;
      `;

    pool
    .query(queryStr,queryParams)
    .then((result) => {
        let user = result.rows[0];
        if (user.id === id) {
          resolve(user);
        } else {
          user = null;
          resolve(user);
        }
      })
      .catch(error => reject(error));
  });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
// const addUser = function(user) {
//   const userId = Object.keys(users).length + 1;
//   user.id = userId;
//   users[userId] = user;
//   return Promise.resolve(user);
// };


const addUser = function(user) {
  return new Promise((resolve, reject) => {
    const queryParams = [user.name, user.email, user.password];
    let queryStr = `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3) RETURNING *;`;

    pool
    .query(queryStr,queryParams)
    .then(result => {
      resolve(result.rows[0]);
    })
    .catch(error => reject(error));
  })
}

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  const queryParams = [limit];
  let queryStr = `SELECT * FROM properties LIMIT $1`;
  return pool
    .query(queryStr,queryParams)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
