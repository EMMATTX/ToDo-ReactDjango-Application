import axios from "axios";
import React, { useState } from "react";
import { Button, InputGroup, FormControl, Form} from "react-bootstrap";


export default function TodoForm({ todos, setTodos }) {
    const [name, setName] = useState("");

    const handleChange = e => {
        setName(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!name) {
            alert("Please provide a valid value for todo");
            return;
        }

        axios.post("/api/todos/", {
            name: name
        }).then((res) => {
            setName("");
            const { data } = res;
            setTodos([
                ...todos,
                data
            ]).catch(() => {
                alert("Something went wrong");
            })
        })
    }

    return <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-4">
            <FormControl placeholder="New Todo"
                onChange={handleChange}
                value={name}
            />
            <Button type="submit">
                Add
            </Button>
        </InputGroup>
    </Form>
}