import React from 'react'
import axios from 'axios'

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
      const ticketQuantity = localStorage[eventId]
      orderEvents.push({eventId, ticketQuantity, event})
    }
    this.setState({orderEvents})
  }

  async handleChange(e) {
    const eventId = parseInt(e.target.id)
    const ticketQuantity = parseInt(e.target.value)
    const originalOrderEvents = this.state.orderEvents
    const orderEvents = originalOrderEvents.map(orderEvent => {
      if (orderEvent.eventId === eventId) {
        return {...orderEvent, ticketQuantity}
      } else return orderEvent
    })
    this.setState({orderEvents})
    localStorage.setItem(eventId.toString, ticketQuantity.toString())
  }

  render() {
    return (
      <>
        <CartItem
          orderEvent={orderEvent}
          handleChange={this.handleChange}
          key={orderEvent.id.toString()}
        />
        <Link to="/guestCheckout">
          <button>Checkout</button>
        </Link>
      </>
    )
  }
}

export default GuestCart
