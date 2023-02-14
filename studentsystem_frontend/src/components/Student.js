import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import {TextField, Container, Paper, Button} from '@mui/material';

export default function Student() {

  const paperStyle = {padding : '50px 20px', width : 600, margin : '20px auto'}

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [student, setStudent] = useState([])

  const handleClick = (e) => {
    e.preventDefault()
    // Creating an object to send data in POST request, (i.e. req.body).
    const student = {name , address}
    console.log(student)
    fetch("http://localhost:8080/student/add", {
      method : "POST",
      headers : {"Content-type" : "application/json"},
      body : JSON.stringify(student)
    }).then(() => {
      console.log("New student added")
    })
  }

  useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
    .then(res => {
      console.log('before res.json()----', res)
      return res.json()
    })
    .then(result => setStudent(result))
  }, [])

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1,  },
      }}
      noValidate
      autoComplete="off"
    >
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <h1 style={{color : 'blue'}} ><u>Add Student</u></h1>
            <TextField id="outlined-basic" label="Student name" variant="outlined" fullWidth
            value = {name}
            onChange = {(e) => setName(e.target.value)}
            />
            <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth 
            value = {address}
            onChange = {(e) => setAddress(e.target.value)}
            />
            <Button variant="contained" color ="primary" onClick={handleClick} >Submit</Button>
        </Paper>
      </Container>

      <h1>Students</h1>
      <Paper elevation={3} style={paperStyle}>

        {student.map((student) => (
            <Paper elevation={6} style={{margin : "10px", padding : "15px", textAlign : "left"}} key = {student.id} >
              Id : {student.id}<br />
              Name : {student.name} <br />
              Address : {student.address}
            </Paper>
        ))}

      </Paper>

    </Box>
  );
}





