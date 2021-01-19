import React from 'react'
import EventCard from './EventCard'

const CartItem = ({orderEvent, handleChange}) => {
  return (
    <div className="cart-item">
      <EventCard event={orderEvent.event} />

      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id={`${orderEvent.eventId}`}
        name="quantity"
        min="1"
        onChange={e => handleChange(e)}
        // max="100"
        value={orderEvent.ticketQuantity}
      />
    </div>
  )
}

export default CartItem
