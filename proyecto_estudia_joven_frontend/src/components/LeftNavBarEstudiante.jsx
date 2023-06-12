import React from 'react';
import { Col, Row, ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function LeftNavBarEstudiante() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Col sm={2} className="bg-light sidebar mt-2">
      <ListGroup as="ul">
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <ListGroup.Item as="li" active={isActive("/profile")}>
            <i className="fas fa-user"></i> Mi perfil
          </ListGroup.Item>
        </Link>
        <Link to="/dashboard-estudiante" style={{ textDecoration: "none" }}>
          <ListGroup.Item as="li" style={{ cursor: 'pointer' }} active={isActive("/dashboard")}>
            Dashboard
          </ListGroup.Item>
        </Link>
        <Link to="/cursos-estudiante" style={{ textDecoration: "none" }}>
          <ListGroup.Item as="li" style={{ cursor: 'pointer' }} active={isActive("/cursos")}>
            Cursos
          </ListGroup.Item>
        </Link>
        <ListGroup.Item as="li" style={{ cursor: 'pointer' }} active={isActive("/logout")}>
          <i className="fas fa-sign-out-alt"></i> Log out
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
}
