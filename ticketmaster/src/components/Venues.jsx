import React, { useEffect, useState } from "react";
///import DrinkDetails from "./DrinkDetails";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
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
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
//require(`dotenv`).config();

const BASE_URL = import.meta.env.VITE_BASE_URL;

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

const Venues = ({ drinks, drink, handleMouseEnter, handleMouseLeave }) => {
  let navigate = useNavigate();
  const [expanded, setExpanded] = React.useState([]);
  // const [loaded, setloaded] = useState(Array(drinks.length).fill(false));
  const [venues, setVenues] = useState([]);

  // useEffect(() => {
  //   setloaded(Array(drinks.length).fill(false));

  //   return () => {
  //     setloaded(Array(drinks.length).fill(false));
  //   };
  // }, [drink]);

  const handleExpandClick = (index) => {
    setExpanded((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const showEventDetails = (id) => {
    navigate(`/events/${id}`);
  };

  // //when image is loaded, then set index to true so the image 'grows' using <Grow> UI
  // const handleImageLoaded = (index) => {
  //   let newLoaded = [...loaded];
  //   newLoaded[index] = true;
  //   setloaded(newLoaded);
  // };

  useEffect(() => {
    const getVenues = async () => {
      const { data } = await axios.get(`${BASE_URL}venues`);
      setVenues(data);
      console.log(data);
    };
    getVenues();
  }, []);

  const venue_img = [
    "https://github.com/jsm4228/TicketMaster-Frontend/blob/main/ticketmaster/src/assets/Garden%20Terrace%201.jpeg?raw=true",
    "https://github.com/jsm4228/TicketMaster-Frontend/blob/main/ticketmaster/src/assets/Grand%20Hall%201.jpeg?raw=true",
    "https://github.com/jsm4228/TicketMaster-Frontend/blob/main/ticketmaster/src/assets/Lakeside%201.jpeg?raw=true",
  ];
  return (
    <div className="venue-page">
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
        Venues
      </Typography>
      <Grid
        sx={{
          padding: "20px",
        }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {venues.map((venue, index) => (
          <Grid item xs={2} sm={4} md={4} className="card" key={venue.id}>
            <Grow in={true}>
              <Card
                sx={{
                  border: '10px solid',
                  borderImageSlice: '1',
                  borderWidth: '7px',
                  borderImageSource: 'linear-gradient(to bottom, goldenrod, rgba(218, 165, 32, 0))'
                }}
              >
                <CardMedia
                  component="img"
                  height={"194"}
                  image={venue_img[index]}
                />
                <CardHeader
                  title={venue.name}
                  subheader={venue.location}
                  sx={{
                    backgroundColor: "rgb(218, 165, 32, .4)",
                    color: "rgb(250, 250, 250, 1)",
                    textShadow: "3px 3px 3px grey",
                  }}
                />
                <CardContent></CardContent>
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
                <Collapse
                  in={expanded[index]}
                  timeout="auto"
                  unmountOnExit
                  sx={{ backgroundColor: "rgb(218, 165, 32, .4)" }}
                >
                  <CardContent sx={{ backgroundImage:
            "linear-gradient(to top, rgb(218, 165, 32, .0),rgba(20, 130, 180))" }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      sx={{
                        color: "rgb(250, 250, 250, 1)",
                        textShadow: "3px 3px 3px grey",
                      }}
                    >
                      Brief Description:
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      sx={{
                        color: "rgb(250, 250, 250, 1)",
                        textShadow: "3px 3px 3px grey",
                      }}
                    >
                      {`This venue includes ${venue.bar ? "a bar" : ""}, ${
                        venue.kitchen ? "a kitchen" : ""
                      }, ${
                        venue.bathrooms > 0
                          ? venue.bathrooms + " bathrooms"
                          : "no bathrooms"
                      }, a ${venue.outdoor_space}, and ${venue.accessibility}`}
                    </Typography>

                    <Divider />
                  </CardContent>
                  <CardContent>
                    <nav aria-label="event list">
                      <List>
                        {venue.events.map((event, index) => (
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => showEventDetails(event.id)}
                            >
                              <ListItemText
                                primary={`${event.name} on ${event.date} at ${event.time}`}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </nav>
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

export default Venues;
