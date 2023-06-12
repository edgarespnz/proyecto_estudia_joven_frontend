import React, { useEffect, useState } from 'react'
import LeftNavBarEstudiante from '../components/LeftNavBarEstudiante'
import { Row, Col, Card } from 'react-bootstrap'
import LeftNavBarProfesor from '../components/LeftNavBarProfesor';
import { Link } from 'react-router-dom';

export default function CursosProfesor() {

    const RUTA = "http://localhost:3000";
    const [cursos, setCursos] = useState([]);

    const httpCursosProfesor = async () => {
        try {
            const response = await fetch(`${RUTA}/api/courses/get-courses`, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    teacherId: 2
                }),
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json();
                setCursos(data.lista_de_cursos);

            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        httpCursosProfesor();
    }, []);


    return (
        <>
            <div className='container-fluid'>
                <Row style={{ minHeight: '92.5vh' }}>

                    <LeftNavBarProfesor />
                    <Col sm={10}>
                        <main role="main">
                            <div className="inner-adjust">
                                <div className="pt-3 pb-2 mb-3 border-bottom">
                                    <h1 className="h2">Tus cursos creados</h1>
                                </div>
                                <div className="main-content">
                                    {cursos.map((curso) => (
                                        <Link key={curso.PK_course} to={`/courses-teacher/${curso.PK_course}`} >
                                            <Card><Card.Body>
                                                <Card.Title>{curso.var_name}</Card.Title>
                                                <Card.Text>Nivel: {curso.var_grado_academico}</Card.Text>
                                            </Card.Body>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>

                            </div>
                        </main>
                    </Col>
                </Row>
            </div >
        </>
    )
}
