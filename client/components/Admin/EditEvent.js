import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchEvent} from '../../store/'
import axios from 'axios'

// export default connect(mapState, mapDispatch)(Navbar)

const Form = props => {
  const date = props.date.split('.')[0]
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label htmlFor="title">Title </label>
        <input
          name="title"
          type="text"
          onChange={props.handleChange}
          value={props.title}
        />
        <br /> <br />
        <label htmlFor="date">Date </label>
        <input
          name="date"
          type="datetime-local"
          onChange={props.handleChange}
          value={date}
          // "yyyy-MM-ddThh:mm"
        />
        <br /> <br />
        <label htmlFor="location">Location </label>
        <input
          name="location"
          type="text"
          onChange={props.handleChange}
          value={props.location}
        />
        <br /> <br />
        <label htmlFor="price">Price </label>
        <input
          name="price"
          type="number"
          min="0"
          onChange={props.handleChange}
          value={props.price}
        />
        <br /> <br />
        <label htmlFor="ticketQuantity">Quantity </label>
        <input
          name="ticketQuantity"
          type="number"
          min="1"
          onChange={props.handleChange}
          value={props.ticketQuantity}
        />
        <br /> <br />
        <label htmlFor="description">Description </label>
        <input
          name="description"
          type="text"
          onChange={props.handleChange}
          value={props.description}
        />
        <br /> <br />
        <label htmlFor="imageURL">Image </label>
        <input
          name="imageURL"
          type="url"
          onChange={props.handleChange}
          value={props.imageURL}
        />
        <br /> <br />
        <div>
          <button type="submit">Edit Event</button>
        </div>
      </form>
    </div>
  )
}

export class EditEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      title: '',
      date: '',
      location: '',
      price: 0,
      ticketQuantity: 1,
      isFeatured: false,
      description: '',
      imageURL: '',
      newEdit: false,
      isLoading: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    try {
      const eventId = this.props.match.params.eventId
      await this.props.getSingleEvent(eventId)

      this.setState({
        id: this.props.event.id,
        title: this.props.event.title,
        date: this.props.event.date,
        location: this.props.event.location,
        price: this.props.event.price,
        ticketQuantity: this.props.event.ticketQuantity,
        isFeatured: this.props.event.isFeatured,
        description: this.props.event.description,
        imageURL: this.props.event.imageURL,
        isLoading: false
      })
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
    const eventId = this.props.match.params.eventId

    try {
      const {data} = await axios.put(`/api/events/edit/${eventId}`, this.state)
      this.setState({newEdit: true})
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const event = this.props.event
    const eventId = this.props.match.params.eventId
    console.log()
    return (
      <div>
        <h1>Edit event</h1>

        {this.state.newEdit ? (
          <div>
            <h2>You edited the event {event.title}! Click below to view </h2>
            <Link to={`/events/${eventId}`}>
              <button type="button" className="details">
                View Event
              </button>
            </Link>
          </div>
        ) : (
          ''
        )}

        <hr />
        {this.state.isLoading ? (
          <h2>Please wait a moment while we fetch your event data</h2>
        ) : (
          <Form
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    event: state.singleEvent
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleEvent: id => dispatch(fetchEvent(id))
  }
}

export default connect(mapState, mapDispatch)(EditEvent)
