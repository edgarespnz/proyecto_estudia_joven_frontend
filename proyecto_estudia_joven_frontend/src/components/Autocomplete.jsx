import React, { useState, useEffect } from "react";
import { Form, ListGroup } from "react-bootstrap";

export default function Autocomplete({ onProfesorSelect }) {
    const RUTA = 'http://localhost:3000';

    const [profesores, setProfesores] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [filteredProfesores, setFilteredProfesores] = useState([]);
    const [selectedProfesor, setSelectedProfesor] = useState(null);

    const httpObtenerProfesores = async () => {
        try {
            const response = await fetch(`${RUTA}/api/users/get-teachers`);
            const data = await response.json();
            setProfesores(data.teacher_list);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        httpObtenerProfesores();
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value === "") {
            setFilteredProfesores([]);
        } else {
            const filtered = profesores.filter((profesor) =>
                profesor.var_name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredProfesores(filtered);
        }
    };

    const handleSelectProfesor = (profesor) => {
        setSelectedProfesor(profesor);
        setFilteredProfesores([]);
        onProfesorSelect(profesor.PK_user);
    };

    return (
        <div>
            <Form.Control
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Buscar profesor..."
                style={{ width: "300px", padding: "5px" }}
            />

            <ListGroup>
                {filteredProfesores.map((profesor) => (
                    <ListGroup.Item
                        key={profesor.PK_user}
                        onClick={() => handleSelectProfesor(profesor)}
                        action
                    >
                        {profesor.var_name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};
