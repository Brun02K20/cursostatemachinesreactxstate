import React from 'react'
import { useMachine } from '@xstate/react' // importo el hook que necesito para INICIALIZAR LA MAQUINA DE ESTADOS
import { bookingMachine } from '../../machines/bookingmachine.js' // importo la maquina a inicializar

const BaseLayout = () => {
    const [state, send] = useMachine(bookingMachine); // state me da toda la info de la maquina de estados en un momento determinado en el tiempo
    // send sirve para generar transiciones

    console.log("mi ME: ", bookingMachine);
    console.log("estado actual ME: ", state)
    return (
        <div>BaseLayout</div>
    )
}

export { BaseLayout }