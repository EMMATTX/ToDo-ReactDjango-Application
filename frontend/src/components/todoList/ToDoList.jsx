import axios from 'axios';
import React, { useState } from 'react';
import { ListGroup, Button, Modal, FormControl } from 'react-bootstrap';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdEdit, MdDelete } from 'react-icons/md';

export default function ToDoList({ todos = [], setTodos }){

  const [show, setShow] = useState(false);
  const [record, setRecord] = useState(null);

  const handleClose = () =>{
    setShow(false);
  }

  const handleDelete = (id) =>{
    axios.delete(`/api/todos/${id}/`)
      .then(() =>{
        const newTodos = todos.filter(t =>{
          return t.id !== id;
        })
        setTodos(newTodos);
      }).catch(() =>{
        alert("Something went wrong...");
      })
    
  }

  const handleUpdate = async ( id, value) =>{
    return  axios.patch(`/api/todos/${id}/`, value)
      .then((res) =>{
        const {data} = res;
        const newTodos = todos.map(t =>{
          if (t.id === id){
            return data;

          }
          return t;

        })
        setTodos(newTodos);
      }).catch(() => {
        alert("Oops!, Something went wrong...");
      })
  }
  const renderListGroupItem = (t) => {
    return(
      <ListGroup.Item key={t.id} className="d-flex justify-content-between align-items-center">
        <div className='d-flex justify-content-center'>
          <span style={{
            marginRight: "12px",
            cursor: "pointer"
          }} onClick={() =>{
            handleUpdate(t.id, {
              completed: !t.completed
            })
          }}>
            {t.completed === true ? <MdCheckBox />: <MdCheckBoxOutlineBlank /> }
          </span>
          <span>
            {t.name}
          </span>

        </div>
        
        <div>
          <MdEdit style={{
            cursor: "pointer",
            marginRight: "12px"
          }} onClick= {() => {
            setRecord(t);
            setShow(true);
            }} />

          <MdDelete style={{
            cursor: "pointer"
          }} onClick={() =>{
            handleDelete(t.id);
          }} />
        </div>
      </ListGroup.Item>
    )
  }

  const handleChange = (e) =>{
    setRecord({
      ...record,
      name: e.target.value
    })
  }

  const handleSaveChanges = async () => {
    await handleUpdate(record.id, {
      name: record.name
    })
    handleClose();
  }

  const completedTodos = todos.filter(t => t.completed === true);
  const incompleteTodos = todos.filter(t => t.completed === false);

  return (
    <div>
      <div className='mb-2 mt-4'>
        <h3 className='text-light'>Incomplete Todos ({incompleteTodos.length})</h3>
      </div>
      <ListGroup className="mb-4">
        {incompleteTodos.map(renderListGroupItem )}
      </ListGroup>

      <div className='mb-2 mt-4'>
        Completed Todos ({completedTodos.length})
      </div>
      <ListGroup className="mb-4">
        {completedTodos.map(renderListGroupItem )}
      </ListGroup>

     
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Todo
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormControl value={record ? record.name : ""}
          onChange={handleChange}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>Close</Button>
          <Button variant='primary' onClick={handleSaveChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );

}

export { default as ToDoList } from './ToDoList';