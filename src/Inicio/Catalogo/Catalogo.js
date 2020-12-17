import React, { Component } from 'react';
import { ApiWebUrl } from '../../utils';
import Modelos from '../Modelos/Modelos';
import './Catalogo.css';

export default class Catalogo extends Component {

    constructor(props){
        super(props)
        this.state = {
            listaMarcas:[],
            marcaSeleccionada : ""
        }
    }

    componentDidMount(){
        const rutaServicio = ApiWebUrl + "marcas.php";
        fetch(rutaServicio)
        .then(
            res => res.json()
        )
        .then(
            (result) => {
                console.log(result);
                this.setState({
                    listaMarcas:result
                })
            }
        )
    }

    dibujarMarcas = (datosTablaMarcas) => {
        return(
            <div>
            {datosTablaMarcas.map(itemMarca=>
                <div class="card" id={"tr-marca-"+itemMarca.idmarca} key={itemMarca.idmarca}
                onClick={() => this.seleccionarMarca(itemMarca)}>
                    <img src={ApiWebUrl + "marcas/" + itemMarca.logo} class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <p class="card-text">{itemMarca.nombre}</p>
                    </div>
                </div>
            )}
            </div>
        )
    }

    seleccionarMarca = (itemMarca) => {

        if(this.state.marcaSeleccionada !== ""){
            document.getElementById("tr-marca-" + this.state.marcaSeleccionada.idmarca).classList.remove("fila-seleccionada")
          }  

        this.setState({ marcaSeleccionada : itemMarca })

        document.getElementById("tr-marca-" + itemMarca.idmarca).classList.add("fila-seleccionada")
    }

    render(){
        let contenidoMarcas = this.dibujarMarcas(this.state.listaMarcas);
        let dibujarComponenteModelos = <Modelos marcaModelo={this.state.marcaSeleccionada}/>
        return (
            <div className="container-fluid cajafuera-catalogo">
                <div className="container cajadentro-catalogo">
                    <div className="row fila-catalogo">
                        <div className="col-md-4 lista-marcas">
                            <h1 className="titulo-marcas">Nuestras Marcas de Autos</h1>
                            {contenidoMarcas}
                        </div>
                        <div className="col-md-8">
                            <h1 className="titulo-modelos">Modelos</h1>
                            {dibujarComponenteModelos}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}