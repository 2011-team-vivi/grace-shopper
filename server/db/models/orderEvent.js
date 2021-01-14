const Sequelize = require('sequelize')
const db = require('../db')

const OrderEvent = db.define('orderEvent', {
  ticketQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  purchasePrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = OrderEvent
