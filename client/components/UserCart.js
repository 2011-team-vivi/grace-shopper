import React from 'react'
import axios from 'axios'
import CartItem from './CartItem'

class UserCart extends React.Component {
  constructor() {
    super()
    this.state = {orderEvents: [], order: {}}
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    const {data: order} = await axios.get('/api/orders/pending')
    this.setState({orderEvents: order.orderEvents, order})
  }

  handleChange(e) {
    console.log('eventId', e.target.id)
    // filter events(orderEvents) with the eventid
    // change the ticketquantity
    // send put request
    // setState with the either the result of the request or just target.value
    // decide between optimistic and pessimistic aupdate
  }

  render() {
    console.log(this.state)
    return this.state.orderEvents.map(orderEvent => (
      <CartItem orderEvent={orderEvent} handleChange={this.handleChange} />
    ))
  }
}

export default UserCart
