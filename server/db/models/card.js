const Sequelize = require('sequelize')
const db = require('../db')

const Card = db.define('card', {
  cardType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['MasterCard', 'Amex', 'Discover', 'Visa']]
    }
  },
  nameOnCard: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  cardNumber: {
    type: Sequelize.BIGINT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [16, 17]
    }
  },
  CVV: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 5] //check for inclulsive or not
    }
  },
  expiration: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
      //make sure its not exipred
    }
  },
  billingStreet: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  billingCity: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  billingState: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  billingZip: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [5, 5]
    }
  }
})

module.exports = Card
