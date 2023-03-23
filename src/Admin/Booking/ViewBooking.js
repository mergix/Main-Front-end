import { Card,Typography,CardActions,CardContent,Button,CardMedia,Grid } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState,useEffect } from 'react'
import useStateContext from '../../useStateContext';
import axios from 'axios';
import { useNavigate } from 'react-router'

export default function ViewBooking() {

  const navigate = useNavigate()
  const{context,setContext,resetContext} = useStateContext()
  const [book,setBook] = useState([])
    useEffect(() => {
        axios.get(`https://localhost:7099/api/Booking/${context.bookId}`,{headers: {
          'Authorization': 'Bearer ' + context.jwt
        }})
        .then(res =>{
            setBook(res.data)
            console.log(res.data)
            }).catch(err => console.log(err))
    },[])

    function category(p){
      switch (p) {
        case 1:
          return "Single Room"
          case 2:
            return "Double Room"
          case 3:
            return "Deluxe Room"
          case 4:
            return "Presidential Suite"
        default:
          return "no value"
      }
    }
  
    function status(p){
      switch (p) {
        case 0:
          return "Available"
          case 1:
            return "Booked"
        default:
          return "no value"
      }
    }
  
  return (
    <>
    <Container  style={{marginTop: '100px'}}>
    <Card sx={{
      minHeight: 850,minWidth: 800, mx: 'auto', mt: 10,
  }}>

    <CardContent style={{marginLeft: 180,marginTop:70,alignItems:'center'}}>
      <Typography sx={{ fontSize: 34 }} color="text.secondary" gutterBottom>
        headers
      </Typography>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://picsum.photos/id/237/200/300"
      />
      <Grid container spacing={3} sx >
      <Grid item xs container direction="column" spacing={2}>
      <Typography sx={{ fontSize: 34 }} component="div">
       Room Name:{book.roomName}
      </Typography>
      <Typography sx={{ mb: 1.5,fontSize: 34 }}>
        Status:{status(book.status)}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 34 }}>
        Cost:{book.cost}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 34 }}>
        Type:{category(book.categoryType)}
      </Typography >
      </Grid>
      <Grid item xs container direction="column" spacing={2}>
      <Typography sx={{ mb: 1.5,fontSize: 34 }}>
        Customer Name:{book.firstName}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 34 }}>
        Email: {book.userEmail}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 34 }}>
        placeholder 
      </Typography >
      </Grid>
      </Grid>
      <Typography sx={{ fontSize: 34 }} >
        ------------------------------------------------------
        <br />
        Last Modified:{book.lastModified}
      </Typography>
    </CardContent>
    <CardActions  style={{marginLeft: 400,marginTop:70,alignItems:'center'}}>
      <Button sx={{ fontSize: 34 }} onClick={() => {
        setContext({bookId: book.bookingId});
       navigate('/bookEdit');
       }}>Edit</Button>
      <Button sx={{ fontSize: 34 }} onClick={() => {
        setContext({bookId: book.bookingId});
       navigate('/bookDelete');
       }}>Delete</Button>
    </CardActions>
    </Card>
    </Container>
    </>
  )
}
