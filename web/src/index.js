// Import libraries
import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import { Container } from 'semantic-ui-react';

// Create react component
const App = () => {
    return (
        <Container>
            <Login></Login>
        </Container>
    );
};

// Render react component
ReactDOM.render(
    <App />,
    document.querySelector('#root')
);