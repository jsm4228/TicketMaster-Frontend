import React, { useEffect, useState } from "react";
import DrinkDetails from "./DrinkDetails";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  const [loaded, setloaded] = useState(Array(drinks.length).fill(false));
  const [venues, setVenues] = uVeState([]);

  useEffect(() => {
    setloaded(Array(drinks.length).fill(false));

    return () => {
      setloaded(Array(drinks.length).fill(false));
    };
  }, [drink]);

  const handleExpandClick = (index) => {
    setExpanded((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const showVenueEvents = (id) => {
    navigate(`${id}`);
  };

  //when image is loaded, then set index to true so the image 'grows' using <Grow> UI
  const handleImageLoaded = (index) => {
    let newLoaded = [...loaded];
    newLoaded[index] = true;
    setloaded(newLoaded);
  };

  useEffect(() => {
    const getVenues = async () => {
      const { data } = await axios.get();
      setVenues(data.venues);
    };
  }, []);

  const venue_img = [
    "https://github.com/jsm4228/TicketMaster-Frontend/blob/main/ticketmaster/src/assets/Garden%20Terrace%201.jpeg?raw=true",
    "https://github.com/jsm4228/TicketMaster-Frontend/blob/main/ticketmaster/src/assets/Grand%20Hall%201.jpeg?raw=true",
    "https://github.com/jsm4228/TicketMaster-Frontend/blob/main/ticketmaster/src/assets/Lakeside%201.jpeg?raw=true",
  ];
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {venues.map((venue, index) => (
        <Grid
          item
          xs={2}
          sm={4}
          md={4}
          className="card"
          //onClick={() => showVenueEvents(drink.idDrink)}
          key={venue.idDrink}
        >
          <Grow in={true}>
            <Card
              onLoad={() => {
                handleImageLoaded(index);
              }}
            >
              <CardMedia
                component="img"
                height={"194"}
                image={venue_img[index]}
              />
              <CardContent>
                <Typography variant="body1" color={"black"}>
                  {drink.strDrink}
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
              <Collapse
                in={expanded[index]}
                timeout="auto"
                unmountOnExit
                //component={DrinkDetails}
              >
                <CardContent>
                  Venue Details
                  {/* <DrinkDetails id={drink.idDrink}></DrinkDetails> */}
                </CardContent>
              </Collapse>
            </Card>
          </Grow>
          {/* <img src={drink.strDrinkThumb} alt="" />
          <h3>{drink.strDrink}</h3> */}
        </Grid>
      ))}
    </Grid>
  );
};

export default Venues;
