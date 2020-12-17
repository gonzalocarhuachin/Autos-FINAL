import React, { Component } from 'react';
import './NavBar.css';

export default class NavBar extends Component {
    render(){
        return (
            <div className="container-fluid sticky-top cajafuera-navbar">
                <div className="container cajadentro-navbar">
                    <div className="row fila-navbar">
                        <div className="col-md-4">
                            <a href="/"><h2 className="titulo">Tienda de Autos</h2></a>
                        </div>
                        <div className="col-md-8 col-sm-12">
                            <ul className="nav justify-content-end">
                                <li className="nav-item">
                                    <a href="/" className="nav-link active">Inicio</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/carrito" className="nav-link active">Carrito</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/editarmodelo" className="nav-link active">Editar Modelo</a>
                                </li>
                            </ul> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}