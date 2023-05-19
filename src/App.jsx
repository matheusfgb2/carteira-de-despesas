import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import CreateUser from './pages/CreateUser';
import Wallet from './pages/Wallet';
import './App.css';
import EditUser from './pages/EditUser';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/novo-usuario" component={ CreateUser } />
      <Route
        path="/editar-usuario/:username"
        render={ (props) => <EditUser { ...props } /> }
      />
      <Route path="/carteira" component={ Wallet } />
    </Switch>
  );
}

export default App;
