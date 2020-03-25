import React, {Component} from 'react';
import { Link} from 'react-router-dom'

// importar componentes
// import Orden from './Orden'

export default class Ordenes extends Component{

    /** Sumamos el total de productos que tiene la Orden */
    totalProductos = (datos) => {
        let total = 0;
        datos.map( pedido => {
            total += pedido.cant;
            return true
        })

        return total;
    }

    styleEstatus = (est) => {
        return {
            color: est?'green':'red',
        }
    }

    render(){
        return(
            <div className="ordenes">
                <Link to="nueva">
                    <button type="button" className="btn btn-secondary float-right">Nueva</button>
                </Link>
                
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Cant</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Estatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.ordenes.map( orden => (
                                <tr key={orden.id} to="orden">
                                    <th scope="row">{orden.nombre}</th>
                                    <td>{this.totalProductos(orden.datos)}</td>
                                    <td>{orden.hora}</td>
                                    <td>$$$</td>
                                    <td 
                                        style={this.styleEstatus(orden.estatus)}>
                                        {orden.estatus?'Finalizada':'Pendiente'}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}