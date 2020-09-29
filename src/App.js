import React, { createContext, useState } from 'react';
import './App.css';
import Header from './componenets/Header/Header';
import Shop from './componenets/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './componenets/Review/Review';
import Inventory from './componenets/Inventory/Inventory';
import NotFound from './componenets/NotFound/NotFound';
import ProductDetails from './componenets/ProductDetails/ProductDetails';
import Login from './componenets/Login/Login';
import Shipment from './componenets/Shipment/Shipment';
import PrivateRoute from './componenets/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h3>email: {loggedInUser.email}</h3>
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          {/* <Route path="/shipment">
            <Shipment></Shipment>
          </Route> */}
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          {/* <Route path="/product/:productKey">
              <ProductDetails></ProductDetails>
          </Route> */}
          <Route path="/product/:productKey">
              <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      
      
    </UserContext.Provider>
  );
}

export default App;
