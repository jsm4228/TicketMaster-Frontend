import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { useParams } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const EventDetails = () => {
  const [loaded, setLoaded] = useState(false);
  const [events, setEvents] = useState([]);
  let { id } = useParams();
  const getEvents = async () => {
    const eventAPI = await axios.get(`${URL}events/${id}`);
    setEvents(eventAPI.data);
    // console.log(eventAPI.data)
  };

  useEffect(() => {
    getEvents();
  }, []);

  //when image is loaded, then set index to true so the image 'grows' using <Grow> UI
  const handleImageLoaded = () => {
    setLoaded(!loaded);
  };

  const [cartItems, setCartItems] = useState([])

  const addToCart = () => {
  const storedItems = localStorage.getItem("cartItems")
  const prevCartItems = storedItems ? JSON.parse(storedItems) : []
  const updatedCartItems = [...prevCartItems, events]

  setCartItems(updatedCartItems)
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
}

  
  

  return (
    <div className="event-details-page">
      <Container>
        <Typography variant="h1" sx={{width:'100%'}}>{events.name}</Typography>
        <Grow in={loaded}>
          <img
            className="event-img"
            src={events.img_url}
            alt=""
            onLoad={handleImageLoaded}
          />
        </Grow>
        <Typography variant="body2">
          <strong>Event Description:</strong> {events.event_description}
        </Typography>
        <Typography variant="body2">{events.date}</Typography>
        <Typography variant="body2">{events.time}</Typography>
        <Typography variant="body2">{events.venue_name}</Typography>
        <Typography variant="body2">{events.theme}</Typography>
        <Typography variant="body2">{events.performers}</Typography>
        <Typography variant="body2">Price: ${events.price}</Typography>

        <Button sx={{
            backgroundColor: 'goldenrod', 
            color: 'rgb(20, 130, 180)',
            border: 'solid 2px rgb(84, 149, 206)'}}onClick={addToCart}>ADD</Button>      

        </Container>

    </div>
  );
};

export default EventDetails;
