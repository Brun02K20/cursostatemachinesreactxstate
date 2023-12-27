import React from 'react';
import { useMachine } from '@xstate/react';
import { Nav } from '../../components/Nav/Nav.js';
import { StepsLayout } from '../StepsLayout/StepsLayout.js';
import { bookingMachine } from '../../machines/bookingmachine.js';
import './BaseLayout.css';

export const BaseLayout = () => {
    const [state, send] = useMachine(bookingMachine);

    console.log('nuestra maquina', state);
    console.log('matches true', state.matches('initial'));
    console.log('matches false', state.matches('tickets'));
    console.log('can', state.can('FINISH'));
    return (
        <div className='BaseLayout'>
            <Nav />
            <StepsLayout />
        </div>
    );
}
