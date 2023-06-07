import React from 'react'
import { Col,Row,ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function LeftNavBarProfesor() {
    return (
        <Col sm={2} className="bg-light sidebar mt-2">

            <ListGroup as="ul">
                <Link to={"/profile"} style={{ textDecoration: "none" }}><ListGroup.Item as="li">
                    <i className="fas fa-user"></i> Mi perfil
                </ListGroup.Item></Link>
                <Link to={"/dashboard"} style={{ textDecoration: "none" }}><ListGroup.Item as="li" style={{ cursor: 'pointer' }} >
                    Dashboard
                </ListGroup.Item> </Link>

                <Link to={"/crear-curso"} style={{ textDecoration: "none" }}><ListGroup.Item as="li" style={{ cursor: 'pointer' }} >
                    Curso
                </ListGroup.Item> </Link>

                <ListGroup.Item as="li" style={{ cursor: 'pointer' }} ><i className="fas fa-sign-out-alt"></i> Log out</ListGroup.Item>
            </ListGroup>
        </Col>
    )
}
