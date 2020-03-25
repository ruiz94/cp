import React from 'react';

const Orden = (props) => {
    const {datos} = props.orden
    return (
        <div className="orden">
            <p>Orden de {props.orden.nombre}</p>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Guiso</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        datos.map( pedido => (
                            <tr>
                                <th scope="row">{pedido.nombre}</th>
                                <td>{pedido.cant}</td>
                                <td>{pedido.guiso}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Orden;