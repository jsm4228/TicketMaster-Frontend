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
} from "@mui/material";
import { useParams } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const EventDetails = () => {
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

  return (
    <div className="event-details-page">
      <Container>
        <Typography variant="h1">{events.name}</Typography>
      </Container>
    </div>
  );
};

export default EventDetails;
