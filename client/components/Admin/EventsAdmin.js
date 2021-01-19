import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchEvents} from '../../store/events'
import axios from 'axios'

export class EventsAdmin extends React.Component {
  constructor() {
    super()
    this.handleClick = this.removeEvent.bind(this)
  }
  componentDidMount() {
    this.props.getEvents()
  }

  async removeEvent(eventId) {
    try {
      await axios.delete(`/api/events/${eventId}`)
      this.props.getEvents()
    } catch (err) {
      console.error(err)
    }
  }

  // try to get rid of calling getEvents method and just map to state
  render() {
    const allEvents = this.props.events

    return (
      <div>
        <div id="allEventsList">
          <h3>Featured Events</h3>
          <br />
          <Link to="/events/add/form">
            <button type="button" className="add-btn">
              Add Event
            </button>
          </Link>
          <div id="eventCard">
            {allEvents[0] &&
              allEvents.map(event => {
                return (
                  <div key={event.title}>
                    <div>
                      <img
                        src={event.imageURL}
                        style={{width: '200px', height: '200px'}}
                      />
                    </div>
                    <div>
                      <strong>{event.title}</strong>
                    </div>
                    <div>
                      Date and Time:
                      {new Date(event.date).toLocaleString('en-US')}
                    </div>
                    <div>Location : {event.location}</div>
                    <div>Price : ${event.price / 100}</div>
                    <Link to={`/events/${event.id}`}>
                      <button type="button" className="details">
                        Details
                      </button>
                    </Link>
                    <Link to={`/events/edit/${event.id}`}>
                      <button type="button" className="edit">
                        Edit
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="delete"
                      onClick={() => this.removeEvent(event.id)}
                    >
                      Delete
                    </button>
                    <br />
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    events: state.events
  }
}

const mapDispatch = dispatch => {
  return {
    getEvents: () => dispatch(fetchEvents())
  }
}

export default connect(mapState, mapDispatch)(EventsAdmin)
