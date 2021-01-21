import React from 'react'
import axios from 'axios'
import CartItem from './CartItem'
import faker from 'faker'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class UserCart extends React.Component {
  constructor() {
    super()
    this.state = {
      orderEvents: [],
      orderId: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCheckOut = this.handleCheckOut.bind(this)
  }

  async componentDidMount() {
    const {data: order} = await axios.get(
      `/api/orders/pending/${this.props.userId}`
    )
    this.setState({orderEvents: order.orderEvents, order})
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
      await axios.put(`/api/orderEvents/${orderEventId}/${this.props.userId}`, {
        ticketQuantity
      })
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
      await axios.delete(`/api/orderEvents/${eventId}/${this.props.userId}`)
      await this.setState({orderEvents})
    } catch (error) {
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

const mapState = state => {
  return {
    userId: state.user.id
  }
}

export default connect(mapState)(UserCart)
