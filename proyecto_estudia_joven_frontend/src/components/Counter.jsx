import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';

const Counter = ({ max, onCountChange }) => {
    const [count, setCount] = useState(1);

    const increment = () => {
        if (count < max) {
            const newCount = count + 1;
            setCount(newCount);
            onCountChange(newCount); // Llama a la función proporcionada por el componente padre
        }
    };

    const decrement = () => {
        if (count > 1) {
            const newCount = count - 1;
            setCount(newCount);
            onCountChange(newCount); // Llama a la función proporcionada por el componente padre
        }
    };

    return (
        <Container className="text-center mt-5">
            <h5>Número de preguntas para la evaluación</h5>
            <p className='text-white'>{count}</p>
            <Button variant="primary" onClick={increment} disabled={count === max}>
                Increment
            </Button>{' '}
            <Button variant="primary" onClick={decrement} disabled={count === 1}>
                Decrement
            </Button>
        </Container>
    );
};

export default Counter;
