'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('information_categories',[
        {
            name: 'リリース',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'イベント',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: '社内',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
      ])
    },


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
