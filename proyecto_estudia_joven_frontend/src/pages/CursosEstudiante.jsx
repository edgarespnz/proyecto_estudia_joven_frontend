import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';
import LeftNavBarEstudiante from '../components/LeftNavBarEstudiante';
import Autocomplete from '../components/Autocomplete';
import { Link } from 'react-router-dom';

export default function CursosEstudiante() {

    const RUTA = 'http://localhost:3000';
    const [listaCursos, setListaCursos] = useState([])
    const [teacherId, setTeacherId] = useState();
    const [isSelected, setIsSelected] = useState(false)
    const [profesores, setProfesores] = useState([])

    const [selectedProfesorId, setSelectedProfesorId] = useState(null);

    //maneja el profesor seleccionado
    const handleProfesorSelect = (profesorId) => {
        console.log('Profesor seleccionado:', profesorId);
        setSelectedProfesorId(profesorId);
        // Aquí puedes realizar cualquier otra acción que desees con el profesor seleccionado
        httpObtenerCursosPorProfesor()
    };

    const httpObtenerCursosPorProfesor = async () => {
        try {
            const response = await fetch(`${RUTA}/api/courses/get-courses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teacherId: selectedProfesorId, // Reemplaza 123 con el ID del profesor que deseas consultar
                }),
            });
            const data = await response.json();
            setListaCursos(data.data);
            console.log(listaCursos)


        } catch (error) {
            console.log(error);
        }
    };

    const httpObtenerTodosLosCursos = async () => {
        try {
            const response = await fetch(`${RUTA}/api/courses/get-all-courses`)
            const data = await response.json();
            setListaCursos(data.data);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        httpObtenerTodosLosCursos();
    }, []);


    useEffect(() => {
        if (selectedProfesorId !== null) {
            httpObtenerCursosPorProfesor();
        }
    }, [selectedProfesorId]);

    return (
        <>
            <div className='container-fluid'>
                <Row style={{ minHeight: '92.5vh' }}>

                    <LeftNavBarEstudiante />
                    <Col sm={10}>
                        <main role="main">
                            <div className="inner-adjust">
                                <div className="pt-3 pb-2 mb-3 border-bottom">
                                    <h3>Cursos disponibles</h3>
                                </div>
                                <div className="main-content">
                                    <Row>
                                        <Col>
                                            <h4>Filtrar por profesor</h4>
                                            <Autocomplete onProfesorSelect={handleProfesorSelect} />

                                            <div className='d-flex align-content-center justify-content-between p-5'>
                                                {listaCursos && listaCursos.length > 0 ? (
                                                    listaCursos.map((curso) => {
                                                        return (
                                                            <Link key={curso.PK_course} to={`/courses-student/${curso.PK_course}`}>
                                                                <Card className='p-2 m-3'>
                                                                    <Card.Title>{curso.var_name}</Card.Title>
                                                                    <Card.Body>Este curso es del nivel : {curso.var_grado_academico}</Card.Body>
                                                                </Card>
                                                            </Link>
                                                        );
                                                    })
                                                ) : (
                                                    <p>No hay cursos disponibles.</p>
                                                )}

                                            </div>

                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </main>
                    </Col>
                </Row>
            </div >
        </>
    );
}