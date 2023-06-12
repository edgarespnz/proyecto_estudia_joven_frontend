import React from 'react';
import { Row, Col } from 'react-bootstrap';
import LeftNavBarProfesor from '../components/LeftNavBarProfesor';

export default function DashboardProfesor() {

  return (
    <>
      <div className='container-fluid'>
        <Row style={{ minHeight: '92.5vh' }}>
          
          <LeftNavBarProfesor/>
          <Col sm={10}>
            <main role="main">
              <div className="inner-adjust">
                <div className="pt-3 pb-2 mb-3 border-bottom">
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