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
            id:1,
            name: 'リリース',
            delete_flag: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id:2,
            name: 'イベント',
            delete_flag: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id:3,
            name: '社内',
            delete_flag: 0,
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
