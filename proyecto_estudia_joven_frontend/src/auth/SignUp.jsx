import React, { useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RUTA = "http://localhost:3000";

function SignUp() {

    const [names, setNames] = useState("");
    const [lastNames, setLastNames] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [showAlert, setShowAlert] = useState(false)

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    async function handleSubmit(e) {
        e.preventDefault();
        
        if (names === "" || lastNames === "" || email === "" || password === "") {
          setShowAlert(true);
        } else {
          try {
            console.log(RUTA);
            const response = await fetch(`${RUTA}/api/users/create-new-user`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                var_name: names,
                var_lastname: lastNames,
                var_email: email,
                var_password: password,
                var_role: "alumno",
              }),
              credentials: 'include',
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              navigate("/verify-email");
            } else {
              throw new Error('Failed to create account');
            }
          } catch (error) {
            console.error(error);
            setError('Failed to create account');
          } finally {
            setLoading(false);
          }
        }
      }
      

    const createAlert = () => {
        return <Alert variant='danger' onClose={() => setShowAlert(false)} dismissible={true}>Uno de los campos está vacío! </Alert>
    }


    return (
        <div className="mt-5 p-5">
            <Container className='border p-5' style={{ maxWidth: '600px', minHeight: '600px' }}>
                {showAlert === true ? createAlert() : null}
                <h1 className='p-2 text-center'>Crear una cuenta</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mt-3 mb-3" controlId="formNames">
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control type="text" placeholder="Luis Alonso" onChange={(evt) => { setNames(evt.target.value) }} />
                    </Form.Group>

                    <Form.Group className="mt-3 mb-3" controlId="formLastNames">
                        <Form.Label>Apellidos</Form.Label>
                        <Form.Control type="text" placeholder="Ramirez Huaman" onChange={(evt) => { setLastNames(evt.target.value) }} />
                    </Form.Group>

                    <Form.Group className="mt-3 mb-3" controlId="formBasicEmail">
                        <Form.Label>Correo Electronico</Form.Label>
                        <Form.Control type="email" placeholder="luisramirez@example.com" onChange={(evt) => { setEmail(evt.target.value) }} />
                        <Form.Text className="text-muted">
                            Esta plataforma no comparte tu información con nadie.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Contraseña" onChange={(evt) => { setPassword(evt.target.value) }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Acepto los términos y condiciones." />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={loading}>
                        Registrarme
                    </Button>
                </Form>

                <div className='mt-3'>
                    <span>Ya tienes una cuenta? </span>
                    <Link to={"/login"}>Iniciar Sesión</Link>
                </div>
            </Container>
        </div>
    )
}

export default SignUp