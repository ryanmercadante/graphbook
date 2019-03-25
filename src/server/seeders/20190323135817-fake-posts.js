'use strict';

// In the up migration, we are bulk inserting two posts, through the queryInterface and its bulkInsert command.
// For this we pass an array of posts, excluding the id and the associated user
// The id is created automatically, and the user is saved in a separate table later on
// The QueryInterface of Sequelize is the general interface that Sequelize uses to talk to all databaes.
module.exports = {
  up: (queryInterface, Sequelize) => {
    // Get all existing users
    return queryInterface.sequelize.query('SELECT id from Users;').then(users => {
      const usersRows = users[0]
      return queryInterface.bulkInsert('Posts', [{
        text: 'Lorem Ipsum 1',
        userId: usersRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Lorem Ipsum 2',
        userId: usersRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }],
      {});
    });
  },

  // The down migration bulk deletes all rows in the table
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {})
  }
};
