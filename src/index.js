import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './Common/NavBar';
import Footer from './Common/Footer';
import Carrito from './Components/Carrito/Carrito';
import EditarModelo from './Components/EditarModelo/EditarModelo';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar/>
      <div>
        <Route exact path="/" component={App}/>
        <Route exact path="/carrito" component={Carrito}/>
        <Route exact path="/editarmodelo" component={EditarModelo}/>
      </div>
      <Footer/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
