import React from 'react'
import axios from 'axios'
import CartItem from './CartItem'
import {Link} from 'react-router-dom'

class GuestCart extends React.Component {
  constructor() {
    super()
    this.state = {orderEvents: []}
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  async componentDidMount() {
    let orderEvents = []
    // for test purposes:
    // const obj = JSON.stringify({1: '2', 5: '10'})
    // localStorage.setItem('cart', obj)

    const cart = JSON.parse(localStorage.getItem('cart'))
    for (let eventId in cart) {
      const {data: event} = await axios.get(`/api/events/${eventId}`)
      const ticketQuantity = cart[eventId]
      orderEvents.push({eventId, ticketQuantity, event})
    }
    this.setState({orderEvents})
  }

  handleCheckOut() {
    localStorage.clear()
  }

  handleChange(e) {
    const {id: eventId, value: ticketQuantity} = e.target
    const originalOrderEvents = this.state.orderEvents
    const orderEvents = originalOrderEvents.map(orderEvent => {
      if (orderEvent.eventId === eventId) {
        return {...orderEvent, ticketQuantity}
      } else return orderEvent
    })
    try {
      const cart = JSON.parse(localStorage.getItem('cart'))
      cart[eventId] = ticketQuantity
      localStorage.setItem('cart', JSON.stringify(cart))
      this.setState({orderEvents})
    } catch (error) {
      console.log(error)
      this.setState({orderEvents: originalOrderEvents})
    }
  }

  handleDelete({eventId}) {
    const originalOrderEvents = this.state.orderEvents
    const orderEvents = originalOrderEvents.filter(
      orderEvent => orderEvent.eventId !== eventId
    )
    try {
      const cart = JSON.parse(localStorage.getItem('cart'))
      delete cart[eventId]
      localStorage.setItem('cart', JSON.stringify(cart))
      this.setState({orderEvents})
    } catch (error) {
      console.log(error)
      this.setState({orderEvents: originalOrderEvents})
    }
  }
  render() {
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
        {this.state.orderEvents.length > 0 ? (
          <Link to="/ConfirmationPage">
            <button type="button" onClick={this.handleCheckOut}>
              Complete Order
            </button>
          </Link>
        ) : (
          <h3>
            Your cart is empty! Click <Link to="/events">here</Link> to browse
            events!
          </h3>
        )}
      </div>
    )
  }
}

export default GuestCart
