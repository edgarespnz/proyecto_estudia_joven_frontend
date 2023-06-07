import React from 'react'
import LeftNavBarEstudiante from '../components/LeftNavBarEstudiante'
import { Row,Col } from 'react-bootstrap'

export default function CursosEstudiante() {
    return (
        <>
            <div className='container-fluid'>
                <Row style={{ minHeight: '92.5vh' }}>

                    <LeftNavBarEstudiante />
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
    )
}
