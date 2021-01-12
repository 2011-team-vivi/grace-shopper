const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  time: {
    type: Sequelize.TIME,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: 0
  },
  isFeatured: {
    type: Sequelize.BOOLEAN
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageURL: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isURL: true
    },
    defaultValue: 'https://static.dw.com/image/18920718_303.jpg'
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Event
