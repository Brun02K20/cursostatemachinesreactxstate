import { assign, createMachine, fromPromise } from 'xstate'; // importo la uncionalidad para crear maquinas de estado de xstate
import { getCountries } from '../services/countries.js';


// esta es la ME hija
const fillCountries = {
    initial: 'loading',
    states: {
        loading: {
            // invoke se usa para llamar a un servicio
            invoke: {
                id: "getCountries",
                src: fromPromise(async () => { // llamo a mi servicio y traigo los datos para aca para la ME
                    const data = await getCountries() // llamo al servicio
                    console.log("paises traidos en fuente: ", data) // consoleo
                    return data // retorno
                }),
                // cuando el servicio finalice con exito
                onDone: {
                    target: "success",
                    actions: assign({
                        countries: (context, event) => context.event.output, // Asigno lo traido en el servicio al contexto
                    }),
                },
                // cuando el servicio finalice sin exito
                onError: {
                    target: "failure",
                    actions: assign({
                        error: "No funciono la request a los paises"
                    })
                }
            }
        },
        success: {},
        failure: {
            on: {
                RETRY: { target: 'loading' }
            }
        }
    }
}


// creo la maquina de estados y la almaceno en una variable
const bookingMachine = createMachine({
    id: 'buy plane tickets',
    initial: 'initial',
    states: {
        initial: {
            entry: assign({
                selectedCountry: '',
                pasajeros: [],
                countries: [],
                error: ""
            }),
            on: {
                START: {
                    target: "search",
                    // actions: "imprimirInicio"
                }
            }
        },
        search: {
            // entry: "imprimirEntrada",
            // exit: "imprimirSalida",
            on: {
                CONTINUE: {
                    target: "passengers", // assign se usa para cambiar el valor del contexto de la ME
                    actions: assign({
                        selectedCountry: ({ event }) => event.selectedCountry,
                    })
                },
                CANCEL: "initial",
            },
            ...fillCountries // asi XSTATE entiende que va a ser la ME hija en este estado
        },
        passengers: {
            on: {
                DONE: 'tickets',
                CANCEL: 'initial',
                ADD: {
                    target: "passengers", // aca declaro una autotransicion
                    actions: assign({
                        pasajeros: ({ context, event }) => [...context.pasajeros, event.newPassenger],
                    })
                }
            }
        },
        tickets: {
            // transicion que se ejecute despues de cierto tiempo
            after: {
                5000: {
                    target: "initial",
                }
            },
            on: {
                FINISH: 'initial'
            }
        },
    },
    // asi declaro un contexto inicial de la ME
    context: {
        pasajeros: [],// declaro que va a tener un array de pasaeros para ir almacenando los nombres de los pasajeros
        selectedCountry: '', // para almacenar el pais elegido
        countries: [],
        error: ""
    }
}, { // asi se declaran las acciones
    actions: {
        imprimirInicio: () => console.log("Iniciando la compra de los boletos"),
        imprimirEntrada: () => console.log("Imprimir entrada a search"),
        imprimirSalida: () => console.log("Imprimir salida del search"),
    }
})


// creo una maquina paralela a la bookingMachine
const fileMachine = createMachine({
    id: 'archivos',
    type: 'parallel', // asi le indico al xstate que van a ser maquinas paralelas, que no tienen relacion una con la otra
    states: {
        upload: {
            initial: 'inicial',
            states: {
                inicial: {
                    on: {
                        INIT_UPLOAD: { target: 'cargando' }
                    }
                },
                cargando: {
                    on: {
                        UPLOAD_COMPLETE: { target: 'terminado' }
                    }
                },
                terminado: {}
            }
        },
        download: {
            initial: 'inicial',
            states: {
                inicial: {
                    on: {
                        INIT_DOWNLOAD: { target: 'cargando' }
                    }
                },
                cargando: {
                    on: {
                        DOWNLOAD_COMPLETE: { target: 'terminado' }
                    }
                },
                terminado: {}
            }
        }
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

