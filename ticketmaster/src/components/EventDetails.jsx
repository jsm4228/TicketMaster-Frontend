import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
  } from '@mui/material';


const URL = import.meta.env.VITE_API_URL;



const EventDetails = () => {
    const [events, setEvents] = useState([]);


    const getEvents = async() => {
        const eventAPI = await axios.get(`${URL}events`)
        setEvents(eventAPI.data)
        // console.log(eventAPI.data)
      }
      
    
      useEffect(() => {
        getEvents()
      },[])



    return (
    <div className='event-details-page'>
        <Container>
            <Typography variant='h1'>
                {events.name}

            </Typography>
        </Container>

    </div>
    )
  }
  
  export default EventDetails
  