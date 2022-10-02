import  React, { useState, useEffect } from 'react';
import  {NavigationBar, ToDoList, ToDoForm } from './components';
import Container from 'react-bootstrap/Container';
import axios from "axios";



export default function App()  {
  
  const [todos, setTodos] = useState([]);

  useEffect(() => {
  
    axios.get("/api/todos/")
      .then((res) =>{
        setTodos(res.data);
      }).catch(() => {
        alert("Something went wrong!...");
      });
  }, [])
  
  return (
    <div style={{backgroundColor: "#cfe8fc", height: "100vh"}}>

      <div>
        <NavigationBar />
      </div>

      <Container>
        <div>
          <ToDoForm />
          <ToDoList todos={todos} />

        </div>
      </Container>
      
    </div> 
    

  )


}