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

    return queryInterface.bulkInsert('Users',[
      {
        name: 'Taro',
        pass: 'yamada',
        mail: 'taro@yamada.jp',
        age: 39,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hanako',
        pass: 'flower',
        mail: 'hanako@flower.jp',
        age: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tiru',
        pass: 'kasai',
        mail: 'tiru@kasai.jp',
        age: 56,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'hina',
        pass: 'takahashi',
        mail: 'hina@takahashi.jp',
        age: 21,
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
    return queryInterface.bulkDelete('Users',null, {})
  }
};
