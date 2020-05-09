import React from 'react';
import Home from './components/Home';
import LoginForm from './components/login/LoginForm';
import SignupForm from './components/login/SignupForm';
import Webnavbar from './components/layout/Webnavbar';
import './App.css';
import UserProvider from './components/contexts/UserContext';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App: React.FC = () =>  {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Webnavbar />
          <Switch>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/register">
              <SignupForm />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
