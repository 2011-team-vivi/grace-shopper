import React from 'react'
import {connect} from 'react-redux'
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
                      style={{width: '200px', height: '250px'}}
                    />
                  </div>

                  <div>Date and Time: {event.date}</div>
                  <div>Location : {event.location}</div>
                  <div>Price : {event.price}</div>
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
