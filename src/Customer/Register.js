import React,{ useEffect } from 'react'
import { Card, CardContent, TextField, Typography } from '@mui/material'
import {Button} from '@mui/material'
import { Box, width } from '@mui/system'
import useForm from '../useForm'
import { createAPIEndpoint, ENDPOINTS } from '../api'
import useStateContext from '../useStateContext'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Center from '../Center'


const getFreshModel = () =>({
    firstName: '' ,
    lastName: '' ,
    userEmail: '',
    userPassword: ''
})
export default function Register() {

    const{context,setContext,resetContext} = useStateContext()
    const navigate = useNavigate()

    const{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    useEffect(() => {
        resetContext()
    }, [])

    const register = e =>{
        e.preventDefault();
       axios.post('https://localhost:7099/api/User',values,{ withCredentials: true }).then(res => {
        setContext({userId: res.data.userId})
        console.log(res.data.userId)
        console.log(values)
        navigate('/')
       }).catch(err => console.log(err))
    }

  return (
    <>
    <Center>

    <Card sx = {{width: '400px'}}>
       <CardContent sx={{textAlign:'center'}}>
           <Typography variant='h3' sx={{marginY: 3}}> Make a new account</Typography>
       <Box sx={{
       '& 	.MuiTextField-root':{
           margin: 1,
           width: '90%'
       }
   }}>
   <form noValidate autoComplete='on' onSubmit={register}>
   <TextField
       label = "FirstName"
       name = "firstName"
       value={values.firstName}
       onChange = {handleInputChange}
       variant = "outlined"
       {...(errors.firstName && { error: true, helperText: errors.firstName })}
       />
              <TextField
       label = "LastName"
       name = "lastName"
       value={values.lastName}
       onChange = {handleInputChange}
       variant = "outlined"
       {...(errors.lastName && { error: true, helperText: errors.lastName })}
       />

       <TextField
       label = "Email"
       name = "userEmail"
       value={values.userEmail}
       onChange = {handleInputChange}
       variant = "outlined"
       {...(errors.userEmail && { error: true, helperText: errors.userEmail })}
       />

       <TextField
       label = "Password"
       name = "userPassword"
       value={values.userPassword}
       onChange = {handleInputChange}
       variant = "outlined"
       {...(errors.userPassword && { error: true, helperText: errors.userPassword })}
       />

       <Button
       type = "submit"
       variant = "contained"
       size = "large"
       sx = {{width: '90%'}}> Create Account</Button>
       
   </form>
   </Box>

</CardContent>
   </Card>
    </Center>
    <footer class="footer">
			<p>
			Ismail Fagbenro
			</p>
			<p>
				These are My links to contact me.
			</p>
			<div class="social">
				<a href="first.html" ><i class="fa-brands fa-github fa-2xl"></i></a>
				<a href="first.html" class="first"><i class="fa-brands fa-linkedin-in fa-2xl"></i></a>
			</div>
			<p>
				Email
			</p>

			<p>
				Mobile
			</p>
	</footer>
    </>

    
  )
}
