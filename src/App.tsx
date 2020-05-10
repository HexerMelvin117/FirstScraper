import React from 'react';
import Home from './components/Home';
import Login from './components/login/Login';
import Signup from './components/login/Signup';
import Webnavbar from './components/layout/Webnavbar';
import UserProvider from './components/contexts/UserContext';
import ProductProvider from './components/contexts/ProductsContext';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App: React.FC = () =>  {
  return (
    <div className="App">
      <UserProvider>
        <ProductProvider>
          <Router>
            <Webnavbar />
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Signup />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </ProductProvider>
      </UserProvider>
    </div>
  );
}

export default App;
