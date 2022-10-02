import React, { useState } from "react";
import {Button, InputGroup, FormControl, Form} from "react-bootstrap";


export default function ToDoForm() {

  const [name, setName] = useState("");

  const handleChange = e => {
    setName(e.target.value);
  }



  return (
    <Form>
      <InputGroup className="mb-4">
        <FormControl 
        onChange={handleChange} 
        value={name} 
        placeholder="New Todo..."
        />
        <Button type="submit">
          Add
        </Button>
      </InputGroup>
    </Form>
  )
}
