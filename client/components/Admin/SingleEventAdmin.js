import axios from 'axios'
import React from 'react'
import {connect} from 'react-redux'
import {fetchEvent, fetchEvents} from '../../store'
import {Link} from 'react-router-dom'

export class SingleEventAdmin extends React.Component {
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

      this.props.getSingleEvent(eventId)
      this.props.getEvents()
    } catch (err) {
      console.error(err)
    }
  }

  async removeEvent(eventId) {
    try {
      await axios.delete(`/api/events/${eventId}`)
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

      if (this.props.isLoggedIn) {
        console.log(this.state)
        await axios.post(`/api/orderEvents/`, this.state)
      } else if (!localStorage.getItem(this.state.eventId.toString())) {
        localStorage.setItem(
          this.state.eventId.toString(), // Key
          this.state.ticketQuantity.toString() // Value
        )
      } else {
        // I want to update the value at the key
        const currentTicketQuantity = localStorage.getItem(
          this.state.eventId.toString()
        )
        const newQuantity =
          parseInt(currentTicketQuantity) + parseInt(this.state.ticketQuantity)
        localStorage.setItem(
          this.state.eventId.toString(),
          newQuantity.toString()
        )
      }

      // removing successfully added to cart pop after a second
      setTimeout(() => {
        this.setState({
          addedToCart: false
        })
      }, 1000)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const event = this.props.event
    const isSoldout = event.ticketQuantity === 0
    const isFree = event.price === 0
    const similiarEvents = this.props.similiarEvents.slice(0, 6)
    const user = this.props.user

    console.log(this.props.isLoggedIn)
    return (
      <div>
        <h1>{event.title}</h1>
        <Link to="/events">
          <button type="button" className="edit">
            Back to All Events
          </button>
        </Link>
        <Link to={`/events/edit/${event.id}`}>
          <button type="button" className="edit">
            Edit
          </button>
        </Link>
        <Link to="/events">
          <button
            type="button"
            className="delete"
            onClick={() => {
              this.removeEvent(event.id)
              alert('This event has been removed!')
            }}
          >
            Delete
          </button>
        </Link>

        <div>
          <img src={event.imageURL} style={{width: '400px', height: '400px'}} />
        </div>
        <h3> Date and Time: {new Date(event.date).toLocaleString('en-US')}</h3>
        <h4>Location: {event.location}</h4>
        <h4>{isFree ? 'FREE' : `Price: $${event.price}`}</h4>
        <p>Description: {event.description}</p>
        <br />
        {this.state.addedToCart ? (
          <div>
            <h2>You added {event.title} to you cart!</h2>
          </div>
        ) : (
          ''
        )}
        {isSoldout ? (
          <h3>SOLD OUT!</h3>
        ) : (
          <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <label htmlFor="ticketQuantity">quantity: </label>
            <input
              type="number"
              id="quantity"
              name="ticketQuantity"
              defaultValue={this.state.ticketQuantity}
              step="1"
            />
            {/* Add minimum 1 default value */}
            <button type="submit">add to cart</button>
          </form>
        )}

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
    similiarEvents: state.events,
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleEvent: id => dispatch(fetchEvent(id)),
    getEvents: () => dispatch(fetchEvents())
  }
}

export default connect(mapState, mapDispatch)(SingleEventAdmin)
