import React, { Component } from 'react';
import './EditarModelo.css';
import $ from 'jquery/dist/jquery';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons'
import { ApiWebUrl } from '../../utils';

export default class EditarModelo extends Component{

    constructor(props){
        super(props)
        this.state = {
            listaModelos: [],
            nombre: "",
            precio: "",
            idmarca: "",

            modeloSeleccionadoIdmodelo: "",
            modeloSeleccionadoNombre: "",
            modeloSeleccionadoPrecio: "",
            modeloSeleccionadoIdmarca: "",
        }
    }

    componentDidMount(){
        this.obtenerModelos();
    }

    obtenerModelos(){
        const rutaServicio = ApiWebUrl + "modelos.php";
        // var myheaders = new Headers();
        // myheaders.set('Cache-Control','no-cache, must-revalidate');
        // myheaders.set('Expires','0')
        fetch(rutaServicio,
            {
                method:'GET',
                // headers:myheaders
            }
            )
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

    dibujarModelos = (datosTablaModelos) => {
        return(
            <table className="table tabla-editar-modelos">
                <thead className="thead-dark">
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {datosTablaModelos.map(itemModelo =>
                    <tr key={itemModelo.idmodelo}>
                        <td>{itemModelo.idmodelo}</td>
                        <td>{itemModelo.nombre}</td>
                        <td>{itemModelo.precio}</td>
                        <td><FontAwesomeIcon className="fa-icon" icon={faPen} onClick={() => this.mostrarActualizar(itemModelo)}/></td>
                        <td><FontAwesomeIcon className="fa-icon" icon={faTimes} onClick={() => this.modeloEliminar(itemModelo)} /></td>
                    </tr>
                )}
                </tbody> 
            </table>    
        )
    }

    modeloEliminar(itemModelo){
        var respuesta = window.confirm("¿Está seguro que desea eliminar el modelo " + itemModelo.nombre + " ?");
        if(respuesta === true){
            const rutaServicio = ApiWebUrl + "modelos_delete.php";

            var formData = new FormData();
            formData.append("idmodelo",     itemModelo.idmodelo) 
            
            fetch(rutaServicio,{
                method: 'POST',
                body: formData
            })
            
            .then(
                () => {
                    this.obtenerModelos();
                    alert("Se eliminó el modelo " + itemModelo.nombre);
                }
            )
        }

    }

    mostrarActualizar(itemModelo){
        this.setState({
            modeloSeleccionadoIdmodelo : itemModelo.idmodelo,
            modeloSeleccionadoNombre : itemModelo.nombre,
            modeloSeleccionadoPrecio : itemModelo.precio,
            modeloSeleccionadoIdmarca : itemModelo.idmarca,
        })

        $("#modalActualizar").modal();
    }

    dibujarFormularioAgregar(){
        return(
            <div id="formulario-agregar">
                <form onSubmit={this.modelosInsertar}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Nombre"
                            onChange = { (e) => this.setState({ nombre : e.target.value }) }
                            required />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Precio"
                            onChange = { (e) => this.setState({ precio : e.target.value }) }
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="IdMarca"
                            onChange = { (e) => this.setState({ idmarca : e.target.value }) }
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Guardar</button>
                        <button type="button" className="btn btn-primary" onClick={this.ocultarFormularioAgregar} >Cerrar</button>
                    </div>
                </form>
            </div>
        )
    }

    modelosInsertar = (e) =>{
        e.preventDefault();
        const rutaServicio = ApiWebUrl + "modelos_insert.php";

        var formData = new FormData();
        formData.append("nombre",this.state.nombre) 
        formData.append("precio",this.state.precio)
        formData.append("idmarca",this.state.idmarca)   

        fetch(rutaServicio,{
            method: 'POST',
            body: formData
        })
        .then(
            res => res.text()
        )
        .then(
            (result) => {
                console.log(result);
                this.obtenerModelos();
                this.ocultarFormularioAgregar();
            }
        )
    }

    mostrarFormularioAgregar(){
        $("#formulario-agregar").slideDown("slow");
    }
    ocultarFormularioAgregar(){
        $("#formulario-agregar").slideUp("slow");
    }

    modelosActualizar = (e) =>{
        const rutaServicio = ApiWebUrl + "modelos_update.php";

        var formData = new FormData();
        formData.append("idmodelo",this.state.modeloSeleccionadoIdmodelo) 
        formData.append("nombre",this.state.modeloSeleccionadoNombre) 
        formData.append("precio",this.state.modeloSeleccionadoPrecio)
        formData.append("idmarca",this.state.modeloSeleccionadoIdmarca)  

        fetch(rutaServicio,{
            method: 'POST',
            body: formData
        })
        
        .then(
            () => {
                this.obtenerModelos();
                $("#modalActualizar").modal("toggle");
                alert("Se actualizo el modelo con id " +  this.state.modeloSeleccionadoIdmarca);
            }
        )
    }

    dibujarModal(){
        return(
            <div className="modal fade" id="modalActualizar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Actualizar Modelo del Auto</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                        <div class="modal-body">
                            <div className="form-group">
                                <input type="text" className="form-control" value={this.state.modeloSeleccionadoIdmodelo} disabled/> 
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Nombre" value={this.state.modeloSeleccionadoNombre}
                                    onChange = { (e) => this.setState({modeloSeleccionadoNombre: e.target.value})}/> 
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Precio" value={this.state.modeloSeleccionadoPrecio}
                                    onChange = { (e) => this.setState({modeloSeleccionadoPrecio: e.target.value})}/> 
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="IdMarca" value={this.state.modeloSeleccionadoIdmarca}
                                    onChange = { (e) => this.setState({modeloSeleccionadoIdmarca: e.target.value})}/> 
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={() => this.modelosActualizar()}>Actualizar</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        let contenidoModelos = this.dibujarModelos(this.state.listaModelos);
        let contenidoFormularioAgregar = this.dibujarFormularioAgregar();
        let contenidoModal = this.dibujarModal();
        return(
            <div className="container-fluid cajafuera-tablamodelos">
                <div className="container cajadentro-tablamodelos">
                    <div className="row fila-tablamodelos">
                        <div className="col-md-3">
                            <h2 className="titulo-editarmodelos">Editar Modelos</h2>
                            <div className="form-group">
                                <button type="button" className="btn btn-primary" onClick={this.mostrarFormularioAgregar}>
                                Nuevo Modelo</button>
                            </div>
                            {contenidoFormularioAgregar}
                        </div>
                        <div className="col-md-9">
                            {contenidoModelos}
                        </div>
                    </div>
                    {contenidoModal}
                </div>
            </div>
        );
    }
}