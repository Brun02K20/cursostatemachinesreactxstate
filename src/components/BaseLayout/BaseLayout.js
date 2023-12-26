import React from 'react'
import { useMachine } from '@xstate/react' // importo el hook que necesito para INICIALIZAR LA MAQUINA DE ESTADOS
import { bookingMachine } from '../../machines/bookingmachine.js' // importo la maquina a inicializar

const BaseLayout = () => {
    const [state, send] = useMachine(bookingMachine); // state me da toda la info de la maquina de estados en un momento determinado en el tiempo
    // send sirve para generar transiciones

    // console.log("mi ME: ", bookingMachine);
    console.log("mi ME: ", state);

    console.log("matches prueba 1: ", state.matches("initial"))
    console.log("matches prueba 2: ", state.matches("tickets"))
    console.log("can prueba 1: ", state.can("CANCEL"))
    console.log("jugando: ", state.machine.events)
    return (
        <div>BaseLayout</div>
    )
}

export { BaseLayout }