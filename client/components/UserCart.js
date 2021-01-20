import React from 'react'
import axios from 'axios'
import CartItem from './CartItem'
import faker from 'faker'
import {Link} from 'react-router-dom'
import {noExtendLeft} from 'sequelize/types/lib/operators'

class UserCart extends React.Component {
  constructor() {
    super()
    this.state = {
      orderEvents: [],
      orderId: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCheckOut = this.handleCheckOut.bind(this)
  }

  async componentDidMount() {
    const {data: order} = await axios.get('/api/orders/pending')
    this.setState({orderEvents: order.orderEvents, orderId: order.id})
  }

  async handleCheckOut() {
    try {
      await axios.put(`api/orders/${orderId}`, {status: 'complete'})
      //how do i make sure that the correct userId is assigned for the following request?
      await axios.post('api/orders')
    } catch (err) {
      console.log(err)
    }
  }

  async handleChange(e) {
    const eventId = parseInt(e.target.id)
    const ticketQuantity = parseInt(e.target.value)
    let orderEventId
    const originalOrderEvents = this.state.orderEvents
    const orderEvents = originalOrderEvents.map(orderEvent => {
      if (orderEvent.eventId === eventId) {
        orderEventId = orderEvent.id
        return {...orderEvent, ticketQuantity}
      } else return orderEvent
    })
    this.setState({orderEvents})
    try {
      await axios.put(`/api/orderEvents/${orderEventId}`, {ticketQuantity})
    } catch (error) {
      this.setState({orderEvents: originalOrderEvents})
    }
  }

  render() {
    let count = 0
    return this.state.orderEvents.map((orderEvent, i) => (
      <>
        <CartItem
          orderEvent={orderEvent}
          handleChange={this.handleChange}
          key={i}
        />
        <Link to="/ConfirmationPage">
          <button type="button" onClick={this.handleCheckOut}>
            Complete Order
          </button>
        </Link>
      </>
    ))
  }
}

export default UserCart
