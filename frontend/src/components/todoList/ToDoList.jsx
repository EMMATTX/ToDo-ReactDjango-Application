import * as React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default function ToDoList({ todos = [] }){
  return (
    <ListGroup className="mb-4">
      {todos.map(t =>{
        return(
          <ListGroup.Item key={t.id}>
            {t.name}
          </ListGroup.Item>
        )
      })}

    </ListGroup>
  );

}

