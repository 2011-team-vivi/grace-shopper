import React from 'react'
import axios from 'axios'
import CartItem from './CartItem'
import {Link} from 'react-router-dom'

class GuestCart extends React.Component {
  constructor() {
    super()
    this.state = {orderEvents: []}
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    let orderEvents = []
    for (let eventId of Object.keys(localStorage)) {
      const {data: event} = await axios.get(`/api/events/${eventId}`)
      const ticketQuantity = localStorage.getItem(eventId)
      orderEvents.push({eventId, ticketQuantity, event})
    }
    this.setState({orderEvents})
  }

  handleChange(e) {
    const eventId = e.target.id
    const ticketQuantity = parseInt(e.target.value)
    const originalOrderEvents = this.state.orderEvents
    const orderEvents = originalOrderEvents.map(orderEvent => {
      if (orderEvent.eventId === eventId) {
        return {...orderEvent, ticketQuantity}
      } else return orderEvent
    })
    this.setState({orderEvents})
    localStorage.setItem(eventId, ticketQuantity)
  }

  render() {
    return this.state.orderEvents.map(orderEvent => (
      <>
        <CartItem
          orderEvent={orderEvent}
          handleChange={this.handleChange}
          key={orderEvent.eventId.toString()}
        />
        <Link to="/ConfirmationPage">
          <button type="button">Complete Order</button>
        </Link>
      </>
    ))
  }
}

export default GuestCart
