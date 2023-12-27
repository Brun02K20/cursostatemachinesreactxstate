import { createMachine } from 'xstate'; // importo la uncionalidad para crear maquinas de estado de xstate

// creo la maquina de estados y la almaceno en una variable
const bookingMachine = createMachine({
    id: 'buy plane tickets',
    initial: 'initial',
    states: {
        initial: {
            on: {
                START: {
                    target: "search",
                    actions: "imprimirInicio"
                }
            }
        },
        search: {
            entry: "imprimirEntrada",
            exit: "imprimirSalida",
            on: {
                CONTINUE: "passengers",
                CANCEL: "initial",
            },
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
    },
}, { // asi se declaran las acciones
    actions: {
        imprimirInicio: () => console.log("Iniciando la compra de los boletos"),
        imprimirEntrada: () => console.log("Imprimir entrada a search"),
        imprimirSalida: () => console.log("Imprimir salida del search"),
    }
})

export { bookingMachine }

// aca lo que va a ocurrir es que en el estado X, en el evento Y, al iniciar la transicion se va a ejecutar la accion que tiene tal nombre
// nombreEstado: {
//     on: {
//         nnEvento: {
//             target: "estadoAlQueVa",
//             actions: "nombreAccion"
//         }
//     }
// }

// En el estado SEARCH, cuando se entra al estado se ejecuta la accion de imprimir entrada, y cuando se sale del estado, se ejecuta imprimir salida
// search: {
//     entry: "imprimirEntrada",
//     exit: "imprimirSalida",
//     on: {
//         CONTINUE: "passengers",
//         CANCEL: "inicial",
//     },
// },

