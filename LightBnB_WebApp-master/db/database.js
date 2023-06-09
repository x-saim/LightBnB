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
  });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return new Promise((resolve, reject) => {
    const queryParams = [guest_id, limit];
    const queryStr = `SELECT reservations.*, properties.*, avg(rating) as average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2;`;

    pool
      .query(queryStr,queryParams)
      .then(results => {
        resolve(results.rows);
      })
      .catch(error => resolve(error));
  });

};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  let queryStr = `
  SELECT properties.*, AVG(property_reviews.rating) AS average_rating
  FROM properties 
  JOIN property_reviews ON properties.id = property_reviews.property_id
  `;

  // Set up of query statements based on property values passed into options object as filters.
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryStr += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    if (queryParams.length === 1) {
      queryStr += 'WHERE ';
    } else {
      queryStr += 'AND ';
    }
    queryStr += `owner_id = $${queryParams.length}`;
  }
  
  // Minimum price per night filter, converting user inputted dollars to cents.
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night * 100}`);
    if (queryParams.length >= 1) {
      queryStr += 'AND ';
    } else {
      queryStr += 'WHERE ';
    }
    queryStr += `cost_per_night >= $${queryParams.length}`;
  }
  
  // Maximum price per night filter, converting user inputted dollars to cents.
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night * 100}`);
    if (queryParams.length >= 1) {
      queryStr += 'AND ';
    } else {
      queryStr += 'WHERE ';
    }
    queryStr += `cost_per_night <= $${queryParams.length}`;
  }
  
  queryStr += `
  GROUP BY properties.id
  `;

  // Minimum AVG rating filter.
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryStr += `
    HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
  }

  // Limiting amount of listings.
  queryParams.push(limit);
  queryStr += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool
    .query(queryStr,queryParams)
    .then((result) => {
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
  return new Promise((resolve, reject) => {
    
    //add the new property to the properties table.
    const queryStr = `
    INSERT INTO properties (
      owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      street,
      city,
      province,
      post_code,
      country,
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
    )
    RETURNING *;`;
    
    const queryParams = [
      property.owner_id,
      property.title,
      property.description,
      property.thumbnail_photo_url,
      property.cover_photo_url,
      property.cost_per_night * 100, //conversion from user inputted dollars to cents.
      property.street,
      property.city,
      property.province,
      property.post_code,
      property.country,
      property.parking_spaces,
      property.number_of_bathrooms,
      property.number_of_bedrooms
    ];

    pool
      .query(queryStr,queryParams)
      .then(results => {
        resolve(results.rows);
      })
      .catch(error => resolve(error));

  });

};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
