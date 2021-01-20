import React from 'react'
import {connect} from 'react-redux'

function ConfirmationPage(props) {
  console.log('this is working')
  const {isLoggedIn} = props
  return (
    <div>
      <h3>Thank You!</h3>
      {isLoggedIn ? (
        <div>
          <p>Your purchase is complete.</p>
          <p>Your order details have been sent to {props.user.email}.</p>
        </div>
      ) : (
        <div>
          <p>Your purchase is complete!</p>
        </div>
      )}
    </div>
  )
}
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}
export default connect(mapState)(ConfirmationPage)
