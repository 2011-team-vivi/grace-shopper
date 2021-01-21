import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  const {isAdmin} = props
  return (
    <div>
      <h1>{isAdmin ? 'You are an ADMIN!' : ''}</h1>
      <h1>
        Welcome, <span id="emailWelcome">{email}</span>
      </h1>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isAdmin: !!state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  isAdmin: PropTypes.bool
}
