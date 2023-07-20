import React, { useState } from "react"
import axios from "axios"

const Cart = () => {
  const URL = import.meta.env.VITE_BASE_URL
  const [cartItems, setCartItems] = useState(() => {
    const storedItems = localStorage.getItem("cartItems")
    return storedItems ? JSON.parse(storedItems) : []
  })

  const removeFromCart = (index) => {
    const updatedCartItems = cartItems.filter((_, itemIndex) => itemIndex !== index)
  
    setCartItems(updatedCartItems)
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
  }
  
  const buyItem = async (index) => {
    const item = cartItems[index];
  
    try {
      await axios.patch(`${URL}events/${item.id}`, {
        tickets_sold: item.tickets_sold + 1,
      })
  
      removeFromCart(index)
    } catch (error) {
      console.log(error)
    }
  }
  


  return (
    <div>
      <h1>Cart</h1>
      {cartItems.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <button onClick={() => removeFromCart(index)}>Remove</button>
          <button onClick={() => buyItem(index)}>Buy</button>
        </div>
      ))}
    </div>
  )
  
}

export default Cart
