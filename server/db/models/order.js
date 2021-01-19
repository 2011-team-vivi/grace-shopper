const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: ['pending', 'complete']
    }
  }

  // total: {
  //   type: Sequelize.INTEGER,
  //   get() {
  //     return this.firstName + ' ' + this.lastName
  //   },
  // },
})

module.exports = Order
