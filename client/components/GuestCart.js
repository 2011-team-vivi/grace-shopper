import React from 'react'
import axios from 'axios'

class GuestCart extends React.Component {
  state = {
    events: []
  }

  async componentDidMount() {
    let events = []
    for (let eventId of Object.keys(localStorage)) {
      const {data: event} = await axios.get(`/api/events/${eventId}`)
      event.ticketQuantity = localStorage[eventId]
      events.push(event)
    }
    this.setState({events})
  }

  render() {
    console.log(this.state)
    return (
      <div>
        {this.state.events.map(event => (
          <p>
            Title: {event.title} Date: {event.date} Price: {event.price} Qty:
            {event.ticketQuantity}
          </p>
        ))}
      </div>
    )
  }
}

export default GuestCart
