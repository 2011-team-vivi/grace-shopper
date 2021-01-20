import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {AddEvent, EditEvent, EventsAdmin, UserInfo} from './components/Admin'
import {
  Login,
  Signup,
  UserHome,
  AllEvents,
  SingleEvent,
  UserCart,
  GuestCart,
  ConfirmationPage
} from './components'
import {me} from './store'
import {SingleEventAdmin} from './components/Admin/SingleEventAdmin'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    const {isAdmin} = this.props
    // conditionally 'render' rout for guestCart
    // same as above for Admin it is an admin only render admin route-s otherwise render other routes
    // conditionally 'render' route for guestCart
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/ConfirmationPage" component={ConfirmationPage} />
        {/* <Route exact path="/guestCart" component={GuestCart} /> */}

        <Route exact path="/events" component={AllEvents} />
        <Route
          exact
          path="/events/:eventId"
          component={SingleEvent}
          isLoggedIn={isLoggedIn}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        {isLoggedIn ? (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            {/* <Route path="/userCart" component={UserCart} /> */}
            {isAdmin && (
              <Switch>
                {/* Routes placed here are only available for admins */}
                <Route exact path="/events/add/form" component={AddEvent} />
                <Route path="/events/edit/:eventId" component={EditEvent} />
                <Route exact path="/events/:id" component={SingleEventAdmin} />
              </Switch>
            )}
            <Route path="/userCart" component={UserCart} />
          </Switch>
        ) : (
          <Route path="/guestCart" component={GuestCart} />
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINERs
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // the double bang is to cast a value to a boolean -
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
