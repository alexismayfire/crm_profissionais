// Import libraries
import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login'

// Create react component
const App = () => {
    return (
        <div>
            <Login></Login>
        </div>
    );
};

// Render react component
ReactDOM.render(
    <App />,
    document.querySelector('#root')
);