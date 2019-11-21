import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Card } from 'semantic-ui-react';

const Page404 = () => (
    <div style={{ paddingTop: '2%' }}>
        <Card>
            <Card.Content>
                <Header><i className='frown outline icon'></i>Página Não Encontrada!</Header>
            </Card.Content>
            <Card.Content description='A página solicitada não foi encontrada (HTTP 404). Se você acredita que trata-se de um erro, contate o administrador :P' />
            <Card.Content extra>
            <Button color='teal' as={Link} to='/'>
                Início
            </Button>
            </Card.Content>
        </Card>
    </div>
);

export default Page404