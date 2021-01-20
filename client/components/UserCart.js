import React from 'react'
import axios from 'axios'
import CartItem from './CartItem'
import faker from 'faker'
import {Link} from 'react-router-dom'

class UserCart extends React.Component {
  constructor() {
    super()
    this.state = {orderEvents: []}
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    const {data: order} = await axios.get('/api/orders/pending')
    this.setState({orderEvents: order.orderEvents, order})
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
    return this.state.orderEvents.map(orderEvent => (
      <>
        <CartItem
          orderEvent={orderEvent}
          handleChange={this.handleChange}
          key={(orderEvent.id + 15654684).toString()}
        />
        <Link to="/ConfirmationPage">
          <button type="button">Complete Order</button>
        </Link>
      </>
    ))
  }
}

export default UserCart
