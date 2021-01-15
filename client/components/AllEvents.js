import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchEvents} from '../store/events'

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
    console.log(allEvents)
    return (
      <div>
        <h1>All Events</h1>
        <div id="allEventsList">
          <div id="eventCard">
            {allEvents.map(event => {
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
                    {event.date.toLocaleString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div>Location : {event.location}</div>
                  <div>Price : ${event.price}</div>

                  <button
                    type="button"
                    className="details"
                    onClick={() => <Link to={`/events/${event.eventId}`} />}
                  >
                    Details
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

export default connect(mapState, mapDispatch)(AllEvents)
