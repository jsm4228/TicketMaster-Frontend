import React, { useState } from "react";
import axios from "axios";

import {
  Container,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Grid,
  Typography,
  IconButton,
  Skeleton,
  Grow,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";

const Cart = () => {
  const URL = import.meta.env.VITE_BASE_URL;
  const [cartItems, setCartItems] = useState(() => {
    const storedItems = localStorage.getItem("cartItems");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const removeFromCart = (index) => {
    const updatedCartItems = cartItems.filter(
      (_, itemIndex) => itemIndex !== index
    );

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const buyItem = async (index) => {
    const item = cartItems[index];

    try {
      await axios.patch(`${URL}events/${item.id}`, {
        tickets_sold: item.tickets_sold + 1,
      });

      removeFromCart(index);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      sx={{
        textAlign: "center",
        padding: "10px",
        backgroundImage:
          "linear-gradient(to bottom, rgb(250, 250, 250,.9),rgba(219, 233, 245))",
        marginTop: "50px",
        borderRadius: "15px",
        border: "2px solid goldenrod",
      }}
      maxWidth="sm"
    >
      <Typography variant="h4">Cart</Typography>
      <Divider></Divider>
      {cartItems.map((item, index) => (
        <Container sx={{ textAlign: "center", padding: "10px" }} key={index}>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="p">{item.description}</Typography>
          <Button onClick={() => removeFromCart(index)}>Remove</Button>
          <Button onClick={() => buyItem(index)}>Buy</Button>
          {index < cartItems.length ? <Divider></Divider> : null}
        </Container>
      ))}
    </Container>
  );
};

export default Cart;
