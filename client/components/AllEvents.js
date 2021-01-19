import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchEvents} from '../store/events'
import {EventsAdmin} from './Admin/index'

export class AllEvents extends React.Component {
  //   constructor() {
  //     super()
  //     this.state = {}
  //   }

  componentDidMount() {
    this.props.getEvents()
  }

  render() {
    const allEvents = this.props.events || []
    const user = this.props.user
    return (
      <div>
        <h1>All Events</h1>
        {user.isAdmin ? (
          <EventsAdmin />
        ) : (
          <div id="allEventsList">
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
                      <div>Price : ${event.price}</div>
                      <Link to={`/events/${event.id}`}>
                        <button type="button" className="details">
                          Details
                        </button>
                      </Link>
                      <br />
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
    events: state.events,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getEvents: () => dispatch(fetchEvents())
  }
}

export default connect(mapState, mapDispatch)(AllEvents)
