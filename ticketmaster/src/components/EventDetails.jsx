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

  return (
    <div className="event-details-page">
        <Typography variant="h1" sx={{
          backgroundImage: 'linear-gradient(to top, rgb(250, 250, 250, .7),rgba(20, 130, 180))',
          borderTop: '7px solid goldenrod',
          borderBottom: '7px solid goldenrod',
          color: 'rgb(250, 250, 250, 1)',
          padding: '10px',
          textShadow: '3px 3px 3px grey',
        }}>{events.name}</Typography>

      <Container className="event-info" sx={{
        backgroundImage: 'linear-gradient(to bottom, rgb(250, 250, 250,.9),rgba(20, 130, 180))',
        borderBottom: '7px solid goldenrod',
        color: 'rgb(250, 250, 250, 1)',
        padding: '10px',
        textShadow: '3px 3px 3px grey',
        
      }}>

        <Grow in={loaded}>
          <img
            className="event-img"
            src={events.img_url}
            alt=""
            onLoad={handleImageLoaded}
          />
        </Grow>
        <Container sx={{
          background:'rgb(218, 165, 32, .8)',
          textAlign: 'left',
          padding: '10px',
          border:'white solid 1px',
          borderRadius: '3px',
        }}> 
          <Typography variant="body1">
            <strong>Event Description:</strong> {events.event_description}
          </Typography>
          <Typography variant="body1"><strong>Date:</strong> {events.date}</Typography>
          <Typography variant="body1"><strong>Time:</strong> {events.time}</Typography>
          <Typography variant="body1"><strong>Location:</strong> {events.venue_name}</Typography>
          <Typography variant="body1"><strong>Theme:</strong> {events.theme}</Typography>
          <Typography variant="body1"><strong>Performers:</strong> {events.performers}</Typography>
          <Typography variant="body1"><strong>Price:</strong> ${events.price}</Typography>
        </Container>
       
      </Container>

        <Button sx={{
            backgroundColor: 'goldenrod', 
            color: 'rgb(20, 130, 180)',
            border: 'solid 2px rgb(20, 130, 180)',
            margin:'30px',
            marginBottom: '60px',
            width:'200px'}}>ADD</Button>      

       

    </div>
  );
};

export default EventDetails;
