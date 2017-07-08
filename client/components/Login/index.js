import React from 'react';
import { Grid, Card, Image, Button } from 'semantic-ui-react';
import { getLoginUrl } from '../../services/auth';
import octocatImage from '../../images/Octocat.png';
import './styles.css';

const Login = () => (
    <Grid padded centered stretched className="login_grid">
        <Card>
            <Image src={octocatImage} />
            <Card.Content>
                <a href={getLoginUrl()}>
                    <Button fluid basic color="blue">
                        Login with GitHub
                    </Button>
                </a>
            </Card.Content>
        </Card>
    </Grid>
);

export default Login;
