import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
    render(){
        return(
            <div className="container-fluid cajafuera-footer">
                <div className="container cajadentro-footer">
                    <div className="row fila-footer">
                        <div className="col-md-12">
                            <p className="info-footer">Hecho por: Gonzalo Carhuachín || 2020</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}