import React from 'react';
import { Welcome } from '../../components/Welcome/Welcome.js';
import { Search } from '../../components/Search/Search.js';
import { Passengers } from '../../components/Passengers/Passengers.js';
import { Tickets } from '../../components/Tickets/Tickets.js';
import './StepsLayout.css';

export const StepsLayout = ({ state, send }) => {
    const renderContent = () => {
        return <Welcome />;
    };

    return (
        <div className='StepsLayout'>
            {renderContent()}
        </div>
    );
}; 