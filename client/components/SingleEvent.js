import axios from 'axios'
import React from 'react'
import {connect} from 'react-redux'
import {fetchEvent} from '../store/singleEvent'
import {fetchEvents} from '../store/events'
import {SingleEventAdmin} from './Admin'
import {Link} from 'react-router-dom'

export class SingleEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventId: null,
      ticketQuantity: 1,
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
        await axios.post(`/api/orderEvents/${this.props.user.id}`, this.state)
      } else {
        if (!localStorage.getItem('cart')) {
          localStorage.setItem('cart', '{}')
        }
        const eventId = this.state.eventId
        const parsedCartObj = JSON.parse(localStorage.getItem('cart'))
        if (!parsedCartObj[eventId]) {
          parsedCartObj[eventId] = this.state.ticketQuantity
        } else {
          // I want to update the value at the key
          parsedCartObj[eventId] =
            parsedCartObj[eventId] + this.state.ticketQuantity
        }
        localStorage.setItem(
          'cart', // Key
          JSON.stringify(parsedCartObj) // Value
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
  // conditional rednering needed:
  // if there are no tickets render - soldout
  // if there are less than three tickets render - almost gone!
  // if the price is 0 render its - freee

  render() {
    const event = this.props.event
    const isSoldout = event.ticketQuantity === 0
    const isFree = event.price === 0
    const similiarEvents = this.props.similiarEvents.slice(0, 6)
    const user = this.props.user

    return (
      <div>
        {user.isAdmin ? (
          <SingleEventAdmin />
        ) : (
          <div>
            <h1>{event.title}</h1>
            <div>
              <img
                src={event.imageURL}
                style={{width: '400px', height: '400px'}}
              />
            </div>
            <h3>
              {' '}
              Date and Time: {new Date(event.date).toLocaleString('en-US')}
            </h3>
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
                  min="1"
                />
                {/* Add minimum 1 default value */}
                <button type="submit">add to cart</button>
              </form>
            )}

            {/* <Link to="/events">
          <button type="button" className="edit">
            Back to All Events
          </button> */}
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
                          <h4>
                            {new Date(event.date).toLocaleString('en-US')}
                          </h4>
                          <h4>{event.location}</h4>
                        </div>
                      </span>
                    </div>
                  )
                })}
            </div>
          </div>
        )}
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

export default connect(mapState, mapDispatch)(SingleEvent)
