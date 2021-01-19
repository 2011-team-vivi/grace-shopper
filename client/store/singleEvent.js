import axios from 'axios'

const SET_SINGLE_EVENT = 'SET_SINGLE_EVENT'

const setEvent = event => ({
  type: SET_SINGLE_EVENT,
  event
})

export const fetchEvent = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/events/${id}`)
      dispatch(setEvent(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const singleEventReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_EVENT:
      return action.event
    default:
      return state
  }
}

export default singleEventReducer
