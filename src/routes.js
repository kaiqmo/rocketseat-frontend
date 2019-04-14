import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Main from './pages/Main';
import Box from './pages/box';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/box/:id" component={Box} />
        </Switch> 
    </BrowserRouter>
);
// path verifica se o endereco da url comeca com o treco tipo / , o exact garante que so coemca a rota / so qd tiver apenas /
export default Routes;