import React, { Component } from 'react';
import { ApiWebUrl } from '../../utils';
import './Carrito.css';

export default class Carrito extends Component{

    constructor(props){
        super(props)
        this.state = {
            itemsCarrito:[]
        }
    }

    componentDidMount(){
        if(this.props.match.params.id != null){
            console.log(this.props.match.params.id)
            this.obtenerModeloSolo(this.props.match.params.id)
        }
    }

    obtenerModeloSolo = (idmodelo) => {
        const rutaServicio = ApiWebUrl + "modelo_solo.php";
        var formData = new FormData();
        formData.append("idmodelo",idmodelo)  
        fetch(rutaServicio,{
            method: 'POST',
            body: formData
        })
        .then(
            res => res.json()
        )
        .then(
            (modelo) => {
                console.log(modelo);
                this.agregarModeloCarrito(modelo[0])
            }
        )
    }

    agregarModeloCarrito(modelo){
        var itemCarrito = {
            modeloCarrito: modelo,
            cantidad: 1
        }
        let carrito = [];
        if(localStorage.getItem('carrito') !== null){
            carrito = JSON.parse(localStorage.getItem('carrito'));
        }
        carrito.push(itemCarrito)
        localStorage.setItem('carrito',JSON.stringify(carrito));
        console.log("agregarcarrito")
        console.log(carrito)

        this.setState({
            itemsCarrito: carrito 
        })
    }

    dibujarCarrito(datosCarrito){
        console.log("datosCarrito")
        console.log(datosCarrito)
        return(
            <table className="table tabla-carrito">
            <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th className="text-right">Precio ($)</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
            {datosCarrito.map(itemModelo=>
                  <tr key={itemModelo.modeloCarrito.idmodelo} >
                    <td>{itemModelo.modeloCarrito.idmodelo}</td>
                    <td>{itemModelo.modeloCarrito.nombre}</td>
                    <td className="text-right">{parseFloat(itemModelo.modeloCarrito.precio).toFixed(2)}</td>
                    <td>{itemModelo.cantidad}</td>
                    <td className="text-right">{parseFloat(itemModelo.modeloCarrito.precio * itemModelo.cantidad).toFixed(2)}</td>    
                  </tr>
              )}
            </tbody>
            </table>
        )
    }

    vaciarCarrito(){
        localStorage.removeItem("carrito")
        this.setState({
            itemsCarrito: []
        })
    }

    render(){
        let contenidoCarrito = this.dibujarCarrito(this.state.itemsCarrito);
        return(
            <div className="container-fluid cajafuera-carrito">
                <div className="container cajadentro-carrito">
                    <div className="row fila-carrito">
                        <div className="col-md-2"></div>
                        <div className="col-md-10">
                            {contenidoCarrito}
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                    <div className="row fila2-carrito">
                        <div className="col-md-2">
                        <h2 className="titulo-carrito">Carrito</h2>
                        <button type="button" className="btn btn-danger" onClick = {() => this.vaciarCarrito()}>
                                Vaciar carrito</button>
                        </div>
                        <div className="col-md-10"></div>
                    </div>
                </div>
            </div>
        );
    }
}