import React from 'react';
import Home from './components/Home';
import LoginForm from './components/login/LoginForm'
import './App.css';

const App: React.FC = () =>  {
  return (
    <div className="App">
      <LoginForm />
      <Home />
    </div>
  );
}

export default App;
