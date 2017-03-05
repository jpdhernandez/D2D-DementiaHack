'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/d2d-dev'
  },

  // Seed database on startup
  seedDB: process.env.SEED_DB || true

};
