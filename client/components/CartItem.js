import React from 'react'

const CartItem = ({orderEvent, handleChange}) => {
  return (
    <>
      {/* <EventCard event={orderEvent.event} /> */}

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
    </>
  )
}

export default CartItem
