import React from 'react'

const EventCard = ({event}) => {
  return (
    <div key={event.title}>
      <div>
        <img src={event.imageURL} style={{width: '200px', height: '200px'}} />
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
}

export default EventCard
