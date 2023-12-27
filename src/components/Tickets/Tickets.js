import React from 'react';
import './Tickets.css';

export const Tickets = ({ state, send }) => {
    const finish = () => {
        send({ type: "FINISH" })
    };

    return (
        <div className='Tickets'>
            <p className='Tickets-description description'>Gracias por volar con book a fly 💚</p>
            <div className='Tickets-ticket'>
                <div className='Tickets-country'>{state.context.selectedCountry}</div>
                <div className='Tickets-passengers'>
                    {state && state.context.pasajeros.map((e, index) => <li key={index}>{e}</li>)}
                    <span>✈</span>
                </div>
            </div>
            <button onClick={finish} className='Tickets-finalizar button'>Finalizar</button>
        </div>
    );
}; 