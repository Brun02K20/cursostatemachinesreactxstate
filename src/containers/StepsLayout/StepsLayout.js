import React from 'react';
import { Welcome } from '../../components/Welcome/Welcome.js';
import { Search } from '../../components/Search/Search.js';
import { Passengers } from '../../components/Passengers/Passengers.js';
import { Tickets } from '../../components/Tickets/Tickets.js';
import './StepsLayout.css';

export const StepsLayout = ({ state, send }) => {

    // renderizo una pantalla u otra dependiendo del valor en la maquina de estados
    const renderContent = () => {
        if (state.matches("initial")) return <Welcome send={send} />;
        if (state.matches("search")) return <Search send={send} />;
        if (state.matches("tickets")) return <Tickets send={send} />;
        if (state.matches("passengers")) return <Passengers send={send} />;
        return null
    };

    return (
        <div className='StepsLayout'>
            {renderContent()}
        </div>
    );
}; 