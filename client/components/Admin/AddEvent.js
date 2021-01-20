import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Form = props => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label htmlFor="title">Title </label>
        <input name="title" type="text" onChange={props.handleChange} />
        <br /> <br />
        <label htmlFor="date">Date </label>
        <input
          name="date"
          type="datetime-local"
          onChange={props.handleChange}
        />
        <br /> <br />
        <label htmlFor="location">Location </label>
        <input name="location" type="text" onChange={props.handleChange} />
        <br /> <br />
        <label htmlFor="price">Price </label>
        <input
          name="price"
          type="number"
          min="0"
          defaultValue="0"
          onChange={props.handleChange}
        />
        <br /> <br />
        <label htmlFor="ticketQuantity">Quantity </label>
        <input
          name="ticketQuantity"
          type="number"
          min="1"
          defaultValue="1"
          onChange={props.handleChange}
        />
        <br /> <br />
        <label htmlFor="description">Description </label>
        <input name="description" type="text" onChange={props.handleChange} />
        <br /> <br />
        <label htmlFor="imageURL">Image </label>
        <input name="imageURL" type="text" onChange={props.handleChange} />
        <br /> <br />
        <div>
          <button type="submit">Add Event</button>
        </div>
      </form>
    </div>
  )
}

export default class AddEvent extends React.Component {
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
      newAdd: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async handleSubmit(e) {
    e.preventDefault()
    try {
      const {data} = await axios.post('/api/events/add/form', this.state)
      this.setState({id: data.id, newAdd: true})
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div>
        <h1>Add event</h1>

        {this.state.newAdd ? (
          <div>
            <h2>You added an event! Click below to view </h2>
            <Link to={`/events/${this.state.id}`}>
              <button type="button" className="details">
                View Event
              </button>
            </Link>
          </div>
        ) : (
          ''
        )}

        <hr />
        <Form
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}
