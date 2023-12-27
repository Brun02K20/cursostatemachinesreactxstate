import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { Nav } from '../../components/Nav/Nav.js';
import { StepsLayout } from '../StepsLayout/StepsLayout.js';
import { bookingMachine } from '../../machines/bookingmachine.js';
import './BaseLayout.css';

export const BaseLayout = () => {
    const [state, send] = useMachine(bookingMachine);

    // console.log('nuestra maquina', state);
    // console.log('matches true', state.matches('initial'));
    // console.log('matches false', state.matches('tickets'));
    // console.log('can', state.can('FINISH'));

    // para leer el estado actual de la maquina:
    useEffect(() => {
        console.log("ESTADO ACTUAL MAQUINA: ", state.value)
        console.log("CONTEXTO ACTUAL: ", state.context)
    }, [state])

    // para leer el contexto de la maquina: 
    // console.log(state.context)


    return (
        <div className='BaseLayout'>
            <Nav state={state} send={send} />
            <StepsLayout send={send} state={state} />
        </div>
    );
}
