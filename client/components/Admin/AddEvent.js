import React from 'react'
import {connect} from 'react-redux'
import {fetchEvent} from '../../store/events'
import axios from 'axios'

const Form = props => {
  return (
    <div>
      <form>
        <label htmlFor="title">Title </label>
        <input name="title" type="text" />
      </form>
    </div>
  )
}

export default class AddEvent extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   title: this.props.event.title,
    // }
  }
  render() {
    return (
      <div>
        <h1>THIS IS THE ADD EVENT PAGE</h1>
        <Form />
      </div>
    )
  }
}

// export default connect(mapState, mapDispatch)(AddEvent)
