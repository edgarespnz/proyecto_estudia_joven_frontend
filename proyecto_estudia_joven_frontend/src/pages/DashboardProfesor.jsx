import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LeftNavBarProfesor from '../components/LeftNavBarProfesor';

export default function DashboardEstudiante() {

  return (
    <>
      <div className='container-fluid'>
        <Row style={{ minHeight: '92.5vh' }}>
          
          <LeftNavBarProfesor/>
          <Col sm={10}>
            <main role="main">
              <div className="inner-adjust">
                <div className="pt-3 pb-2 mb-3 border-bottom">
                  <h1 className="h2"></h1>
                </div>
                <div className="main-content">

                </div>
              </div>
            </main>
          </Col>
        </Row>
      </div >
    </>
  );
}