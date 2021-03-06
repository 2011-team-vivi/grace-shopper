/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllEvents} from './AllEvents'
export {default as SingleEvent} from './SingleEvent'
export {default as UserCart} from './UserCart'
export {default as GuestCart} from './GuestCart'
export {default as SingleEventAdmin} from './Admin/SingleEventAdmin'
export {default as ConfirmationPage} from './ConfirmationPage'
