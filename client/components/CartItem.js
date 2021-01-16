import React from 'react'

const CartItem = ({event, quantity}) => {
  return (
    <>
      <EventCard event={event} />

      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        min="1"
        // max="100"
      />
    </>
  )
}

export default CartItem
