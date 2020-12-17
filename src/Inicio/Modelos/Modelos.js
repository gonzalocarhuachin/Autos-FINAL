import React, { Component } from 'react';
import { ApiWebUrl } from '../../utils';
import './Modelos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default class Modelos extends Component{

    constructor(props){
        super(props)
        this.state = {
          marcaElegida: props.marcaModelo,
          listaModelos:[]
        }
        console.log("CONSTRUCTOR")
    }

    componentDidMount(){
        console.log("COMPONENTDIDMOUNT")
          console.log(this.state.marcaElegida)
    }
    
    componentWillReceiveProps(props){
        console.log("COMPONENTRECEIVEPROPS")        
        console.log(props.marcaModelo)
        this.obtenerModelosPorMarca(props.marcaModelo)
    }
    
    obtenerModelosPorMarca = (itemMarca) => {
        const rutaServicio = ApiWebUrl + "modelosxmarca.php";
    
        var formData = new FormData();
        formData.append("caty",itemMarca.idmarca)  
        //Asi se agregan todos los parámetros que el servicio requiera (nombre del parámetro , valor que se envía)  
    
        fetch(rutaServicio,{
            method: 'POST',
            body: formData
        })
        .then(
            res => res.json()
        )
        .then(
            (result) => {
                console.log(result);
                this.setState({
                    listaModelos:result
                })
            }
        )
    }

    dibujarModelosTabla = (datosTablaModelos) => {
        return(
            <table className="table table-bordered tabla-modelos">
              <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Precio ($) Dólares</th>
                    <th></th>
                  </tr>
              </thead>
              <tbody>
                  {datosTablaModelos && datosTablaModelos.map(itemModelo=>
                      <tr key={itemModelo.idmodelo}>
                        <td>{itemModelo.idmodelo}</td>
                        <td>{itemModelo.nombre}</td>
                        <td>{itemModelo.precio}</td>
                        <td><Link to={"/carrito"}>
                            <FontAwesomeIcon className="fa-icon" icon={faShoppingCart} />
                        </Link></td>
                      </tr>
                  )}
              </tbody>
          </table>
        )
    }

    render(){
        let contenidoModelosTabla = this.dibujarModelosTabla(this.state.listaModelos);
        return(
            <div>
                <div className="container-fluid cajafueramodelo">
                    <div className="container cajadentromodelo">
                        <div className="row filamodelo">
                            <div className="col-md-12">
                                {contenidoModelosTabla}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}