import React, { useEffect, useState } from "react"
import axios from 'axios'

import { Card, CardContent, Typography, CardActions, CardHeader, Button, IconButton, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




const URL = import.meta.env.VITE_API_URL;

const Events = () => {

  const [events, setEvents] = useState([]);

  const getEvents = async() => {
    const eventAPI = await axios.get(`${URL}events`)
    setEvents(eventAPI.data)
  }

  useEffect(() => {
    getEvents()
  },[])


  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  

  return (
  <div className="event-page">
    <h1 style={{color:'black'}}>Events</h1>
    {events.map((event)=>(
       <Card key={event.id}> 
        <CardHeader title={event.name} subheader={`${event.date}, ${event.time}`}/>
        <CardContent>
          
            <Typography variant="h5" component="h2">
              
            </Typography>
            <Typography variant="body2" color="text.secondary">
            
            </Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />

            </ExpandMore>
        </CardContent>
       </Card>
    ))}
   
  
  
  </div>
  )
}
}
export default Events


