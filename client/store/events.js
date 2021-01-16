import axios from 'axios'

const SET_EVENTS = 'SET_EVENTS'

const setEvents = events => ({
  type: SET_EVENTS,
  events
})

export const fetchEvents = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/events')
      dispatch(setEvents(data))
    } catch (error) {
      console.log('there was an error trying to fetch the events')
    }
  }
}

const eventsReducer = (events = [], action) => {
  switch (action.type) {
    case SET_EVENTS:
      return action.events
    default:
      return events
  }
}

export default eventsReducer
