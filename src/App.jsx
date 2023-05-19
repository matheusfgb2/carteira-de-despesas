import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import CreateUser from './pages/CreateUser';
import Wallet from './pages/Wallet';
import EditUser from './pages/EditUser';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/novo-usuario" component={ CreateUser } />
      <Route path="/editar-usuario/:userId" component={ EditUser } />
      <Route path="/carteira/:userId" component={ Wallet } />
    </Switch>
  );
}

export default App;
