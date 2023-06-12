import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Form, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import LeftNavBarProfesor from '../components/LeftNavBarProfesor';
import Counter from '../components/Counter';

export default function CursoPageProfesor({ match }) {
    const RUTA = 'http://localhost:3000';
    const [curso, setCurso] = useState(null);
    const [material, setMaterial] = useState([]);
    const { idCurso } = useParams();


    const [fileName, setFileName] = useState("");
    const [showAlert, setShowAlert] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [testName, setTestName] = useState("");
    const [evaluaciones, setEvaluaciones] = useState([])
    const [countFromChild, setCountFromChild] = useState(1);


    //crear nueva evaluación
    const createNewTest = async () => {
        try {
            setError("");
            setLoading(true);
            //todo: cambiar valor de duración dinámicamente según el usuario
            //todo: implementar banco de preguntas
            await fetch(`${RUTA}/api/test/create-new-test/${idCurso}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    var_name: testName,
                    var_duration: 30,
                }),
            });
            console.log("Curso creado satisfactoriamente")
            setLoading(false)
            httpObtenerEvaluaciones();
        } catch (error) {
            console.log(error) 
        }
    }

    //maneja el estado del contador de preguntas
    const handleCountChange = (newCount) => {
        setCountFromChild(newCount); // Actualiza el estado en el componente padre con el valor de count
    };


    //obtener evaluaciones
    const httpObtenerEvaluaciones = async () => {
        try {
            const response = await fetch(`${RUTA}/api/test/get-tests/${idCurso}`);
            const data = await response.json();
            setEvaluaciones(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    //alerta para manejo de errores en subir material
    const createAlert = () => {
        return (
            <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                {error}
            </Alert>
        );
    };


    //obtener el curso general
    const httpObtenerCurso = async () => {
        try {
            const response = await fetch(`${RUTA}/api/courses/get-course/${idCurso}`);
            if (response.ok) {
                const data = await response.json();
                setCurso(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //obtener todos los materiales asociado al curso obtenido
    const httpObtenerMaterial = async () => {
        try {
            const response = await fetch(`${RUTA}/api/material/get-material/${idCurso}`);
            const data = await response.json();
            setMaterial(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    //crear nuevo material
    const postNewMaterial = async () => {
        try {
            setLoading(true);
            const fileInput = document.getElementsByClassName("fileName")[0];

            if (fileName === "" || fileInput.files.length === 0) {
                setError('Error: El campo nombre de material está vacío o no has cargado un archivo');
                setShowAlert(true);
                setLoading(false);
                return;
            }

            setError("");
            setLoading(true);

            const formData = new FormData();
            formData.append('var_name', fileName);
            formData.append('file', fileInput.files[0]);

            await fetch(`${RUTA}/api/material/create-new-material/${idCurso}`, {
                method: 'POST',
                body: formData,
            });

            setLoading(false);
            console.log("Material creado satisfactoriamente");
            httpObtenerMaterial();
            // Resto del código para manejar la respuesta del servidor
        } catch (error) {
            setLoading(false)
            setError(error);
            console.error('Error en la solicitud:', error);
        }
    };

    useEffect(() => {
        httpObtenerCurso();
        httpObtenerMaterial();
        httpObtenerEvaluaciones();
    }, []);

    if (!curso) {
        return <div>Cargando curso...</div>;
    }

    return (
        <>
            <div className='container-fluid'>
                <Row style={{ minHeight: '92.5vh' }}>

                    <LeftNavBarProfesor />
                    <Col sm={10}>
                        <main role="main">
                            <div className="inner-adjust">
                                <div className="pt-3 pb-2 mb-3 border-bottom">
                                </div>
                                <div className="main-content">
                                    <Container className='text-center mt-2 p-5'>
                                        <Container className='p-2'>
                                            <h1>Nombre del curso: {curso.data.var_name}</h1>
                                            <h2>Nivel: {curso.data.var_grado_academico}</h2>
                                        </Container>
                                        {/* Agrega aquí el resto de los detalles del curso */}
                                        <Row className='border'>
                                            <Col className='border'>
                                                <h3 style={{ textDecoration: 'underline' }}>Materiales</h3>
                                                {material.map((item) => {
                                                    return (
                                                        <Link key={item.PK_material} to={`/material/${item.PK_material}`}>
                                                            <Col>
                                                                <Card className='mt-5 mb-5'>
                                                                    <Card.Header>{item.var_name}</Card.Header>
                                                                </Card>
                                                            </Col>
                                                        </Link>
                                                    );
                                                })}

                                                <Container className='bg-secondary rounded p-3 mb-3'>
                                                    {showAlert === true ? createAlert() : null}
                                                    <h3>Subir nuevo material</h3>
                                                    <Form.Group controlId="formFile" className="mb-3">
                                                        <Form.Label>Por favor selecciona el archivo a subir</Form.Label>
                                                        <Form.Control className='fileName' type="file" />
                                                        <Form.Control className='mt-2' type="text" placeholder='Ingrese nombre del material' onChange={(evt) => { setFileName(evt.target.value) }} />
                                                    </Form.Group>
                                                    <Button disabled={loading} onClick={() => postNewMaterial()}>Subir Material</Button>
                                                </Container>
                                            </Col>

                                            <Col className='border'>
                                                <h3 style={{ textDecoration: 'underline' }}>Evaluaciones</h3>
                                                {evaluaciones.map((item) => {
                                                    return (
                                                        <Link key={item.PK_test} to={`/material/${item.PK_test}`}>
                                                            <Col>
                                                                <Card className='mt-5 mb-5'>
                                                                    <Card.Header>{item.var_name}</Card.Header>
                                                                    <Card.Body>duración del examen: {item.var_duration} minutos</Card.Body>
                                                                </Card>
                                                            </Col>
                                                        </Link>
                                                    );

                                                })}

                                                <Container className='bg-secondary rounded p-3 mb-3'>
                                                    <h3>Crear nueva evaluación</h3>
                                                    <Form.Group controlId="formFile" className="mb-3">
                                                        <Form.Control className='mt-2' type="text" placeholder='Ingrese nombre de la evaluación' onChange={(evt) => { setTestName(evt.target.value) }} />
                                                        <Counter max={5} onCountChange={handleCountChange} />
                                                    </Form.Group>
                                                    <Button variant='success' disabled={loading} onClick={() => createNewTest()}>Crear nueva evaluación</Button>
                                                </Container>
                                            </Col>
                                        </Row>
                                    </Container>

                                </div>
                            </div>
                        </main>
                    </Col>
                </Row>
            </div >
        </>



    );
}
