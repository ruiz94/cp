import React from 'react'

const Paginacion = (props) => {
    return (
        <div className="py-3">
            <button type="button" className="btn btn-info mr-1" onClick={props.paginaAnterior}>&larr; Anterior </button>
            <span className="badge badge-pill badge-dark">{props.pagina}</span>
            <button type="button" className="btn btn-info" onClick={props.paginaSiguiente}>Siguiente &rarr;</button>
        </div>
    );
}

export default Paginacion;