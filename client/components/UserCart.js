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
    this.handleDelete = this.handleDelete.bind(this)
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

  async handleDelete({eventId}) {
    const originalOrderEvents = this.state.orderEvents
    const orderEvents = originalOrderEvents.filter(
      orderEvent => orderEvent.eventId !== eventId
    )
    try {
      await axios.delete(`/api/orderEvents/${eventId}`)
      await this.setState({orderEvents})
    } catch (error) {
      this.setState({orderEvents: originalOrderEvents})
    }
  }

  render() {
    console.log('render', this.state.orderEvents.length)
    return (
      <div>
        {this.state.orderEvents.map(orderEvent => (
          <CartItem
            orderEvent={orderEvent}
            handleChange={this.handleChange}
            handleDelete={this.handleDelete}
            key={orderEvent.eventId.toString()}
          />
        ))}

        <Link to="/ConfirmationPage">
          <button>Complete Order</button>
        </Link>
      </div>
    )
  }
}

export default UserCart
