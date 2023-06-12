import React from 'react';
import { Col, Row, ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function LeftNavBarProfesor() {
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
        <Link to="/dashboard-profesor" style={{ textDecoration: "none" }}>
          <ListGroup.Item as="li" style={{ cursor: 'pointer' }} active={isActive("/dashboard-profesor")}>
            Dashboard
          </ListGroup.Item>
        </Link>
        <Link to="/cursos-profesor" style={{ textDecoration: "none" }}>
          <ListGroup.Item as="li" style={{ cursor: 'pointer' }} active={isActive("/cursos-profesor")}>
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
