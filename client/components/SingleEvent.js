import axios from 'axios'
import React from 'react'
import {connect} from 'react-redux'
import {fetchEvent} from '../store/singleEvent'
import {fetchEvents} from '../store/events'

export class SingleEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventId: null,
      ticketQuantity: 0,
      purchasePrice: 0,
      addedToCart: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    try {
      const eventId = this.props.match.params.eventId
      console.log(eventId)
      this.props.getSingleEvent(eventId)
      this.props.getEvents()
    } catch (err) {
      console.error(err)
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async handleSubmit(e) {
    e.preventDefault()

    try {
      await this.setState({
        eventId: this.props.event.id,
        purchasePrice: this.props.event.price,
        addedToCart: true
      })
      await axios.post(`/api/orderEvents/`, this.state)
      setTimeout(() => {
        this.setState({
          addedToCart: false
        })
      }, 1000)
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
    const similiarEvents = this.props.similiarEvents.slice(0, 6)
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
        {this.state.addedToCart ? (
          <div>
            <h2>You added {event.title} to you cart!</h2>
          </div>
        ) : (
          ''
        )}
        {/* Form for creating new orderEvent instance*/}
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <label htmlFor="ticketQuantity">quantity: </label>
          <input
            type="number"
            id="quantity"
            name="ticketQuantity"
            defaultValue={this.state.ticketQuantity}
            step="1"
          />
          <button type="submit">add to cart</button>
        </form>
        <br />
        <h2>Similar Events:</h2>
        <hr />
        <div>
          {similiarEvents[0] &&
            similiarEvents.map(event => {
              return (
                <div key={event.title}>
                  <img
                    src={event.imageURL}
                    style={{width: '200px', height: '200px'}}
                  />
                  <span>
                    <div>
                      <h4>{event.title}</h4>
                      <h4>{new Date(event.date).toLocaleString('en-US')}</h4>
                      <h4>{event.location}</h4>
                    </div>
                  </span>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    event: state.singleEvent,
    similiarEvents: state.events
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleEvent: id => dispatch(fetchEvent(id)),
    getEvents: () => dispatch(fetchEvents())
  }
}

export default connect(mapState, mapDispatch)(SingleEvent)
