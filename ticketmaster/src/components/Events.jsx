import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

import {
  Card,
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

const URL = import.meta.env.VITE_BASE_URL;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Events = () => {
  const [expanded, setExpanded] = React.useState([]);
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);

  const getEvents = async () => {
    const eventAPI = await axios.get(`${URL}events`);
    setEvents(eventAPI.data);
    // console.log(eventAPI.data)
  };

  useEffect(() => {
    getEvents();
  }, []);

  const getVenue = async () => {
    const venueAPI = await axios.get(`${URL}venues`);
    setVenues(venueAPI.data);
    // console.log()
  };

  useEffect(() => {
    getVenue();
  }, []);

  const handleExpandClick = (index) => {
    setExpanded((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="events-page">
      <Typography
        variant="h1"
        sx={{
          backgroundImage:
            "linear-gradient(to top, rgb(250, 250, 250, .7),rgba(20, 130, 180))",
          borderTop: "7px solid goldenrod",
          borderBottom: "7px solid goldenrod",
          color: "rgb(250, 250, 250, 1)",
          padding: "10px",
          textShadow: "3px 3px 3px grey",
        }}
      >
        Events
      </Typography>
      <Grid
        sx={{
          padding: "20px",
        }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {events.map((event, index) => (
          <Grid item xs={2} sm={4} md={4} className="card" key={event.id}>
            <Grow in={true}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={event.img_url}
                  alt={event.name}
                />
                <CardHeader
                  title={<Link to={`/events/${event.id}`} style={{textDecoration: 'none'}}>{event.name}</Link>}
                  subheader={`${event.date}, ${event.time}`}
                  sx={{backgroundColor: 'rgb(218, 165, 32, .4)'}}
                />

                <CardContent>
                  <Typography variant="body2" component="h2">
                    <Link to={`/venues/${event.venue_id}`}
                    style={{textDecoration: 'none'}}>
                      {event.venue_name}
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    There are {event.tickets_available} tickets left for this
                    event.
                    <br />
                    Price: ${event.price}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <ExpandMore
                    expand={expanded[index]}
                    onClick={() => handleExpandClick(index)}
                    aria-expanded={expanded[index]}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded[index]} timeout="auto" unmountOnExit sx={{
                  backgroundColor: 'rgb(218, 165, 32, .4)'
                }}>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="p"
                    >
                      <strong>Event Theme:</strong> {event.theme}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="p"
                    >
                      <strong>Performing:</strong> {event.performers}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Events;
