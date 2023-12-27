import React, { useEffect, useState } from 'react';
import './Search.css';

export const Search = ({ send }) => {
    const [flight, setFlight] = useState('');

    const handleSelectChange = (event) => {
        setFlight(event.target.value);
    };

    const options = ['Mexico', 'Venezuela', 'Colombia'];

    useEffect(() => {
        console.log("vuelo: ", flight)
    }, [flight])

    const goToPassengers = () => {
        console.log("continuando")
        send({ type: "CONTINUE" })
    }

    return (
        <div className='Search'>
            <p className='Search-title title'>Busca tu destino</p>
            <select id="country" className='Search-select' value={flight} onChange={handleSelectChange}>
                <option value="" disabled defaultValue>Escoge un país</option>
                {options.map((option) => <option value={option} key={option}>{option}</option>)}
            </select>
            <button onClick={goToPassengers} disabled={flight === ''} className='Search-continue button'>Continuar</button>
        </div>
    );
}; 