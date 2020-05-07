import React from 'react';
import Home from './components/Home';
import LoginForm from './components/login/LoginForm'
import './App.css';
import UserProvider from './components/contexts/UserContext';

const App: React.FC = () =>  {
  return (
    <div className="App">
      <UserProvider>
        <LoginForm />
        <Home />
      </UserProvider>
    </div>
  );
}

export default App;
