import { createMachine } from 'xstate'; // importo la uncionalidad para crear maquinas de estado de xstate

// creo la maquina de estados y la almaceno en una variable
const bookingMachine = createMachine({
    id: 'buy plane tickets',
    initial: 'initial',
    states: {
        initial: {
            on: {
                START: 'search'
            }
        },
        search: {
            on: {
                CONTIUNE: 'passengers',
                CANCEL: 'initial'
            }
        },
        passengers: {
            on: {
                DONE: 'tickets',
                CANCEL: 'initial'
            }
        },
        tickets: {
            on: {
                FINISH: 'initial'
            }
        },
    }
})

export { bookingMachine }