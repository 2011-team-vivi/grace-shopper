import axios from 'axios'
import React from 'react'
import {connect} from 'react-redux'
import {fetchEvent} from '../store/singleEvent'

export class SingleEvent extends React.Component {
  constructor() {
    super()
    this.state = {eventId: null, ticketQuantity: 0, purchasePrice: 0}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    try {
      const eventId = this.props.match.params.eventId
      console.log(eventId)
      this.props.getSingleEvent(eventId)

      const event = this.props.event
      this.setState({
        eventId: event.id,
        ticketQuantity: 0,
        purchasePrice: event.price
      })
    } catch (err) {
      console.error(err)
    }
  }

  // create onsubmit form handler to send quantity of tickets added
  //

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.post(`/api/orderEvents/`, this.state)
    } catch (err) {
      console.error(err)
    }
  }
  // conditional rednering needed:
  // if there are no tickets render a soldout
  // if there are less than three tickets render a almost gone!
  // if the price is 0 render its freee

  render() {
    const event = this.props.event

    return (
      <div>
        <h1>{event.title}</h1>
        <div>
          <img src={event.imageURL} style={{width: '400px', height: '400px'}} />
        </div>
        <h3> Date and Time: {new Date(event.date).toLocaleString('en-US')}</h3>
        <h4>Location: {event.location}</h4>
        <h4>Price: ${event.price / 100}</h4>
        <p>Description: {event.description}</p>
        <br />
        {/* Form for creating new order instance*/}
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <label htmlFor="ticketQuantity">quantity: </label>
          <input type="number" id="quantity" name="ticketQuantity" step="1" />
          <button type="submit">add to cart</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    event: state.singleEvent
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleEvent: id => dispatch(fetchEvent(id))
  }
}

export default connect(mapState, mapDispatch)(SingleEvent)
