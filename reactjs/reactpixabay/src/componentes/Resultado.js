import React, {Component} from 'react'

// importando componentes
import Imagen from './Imagen'
import Paginacion from './Paginacion'

export default class Resultado extends Component{

    mostrarImagenes = () => {
        const imagenes = this.props.imagenes

        if(imagenes.length === 0) return null;

        return (
            <React.Fragment>
                <div className="col-12 p-5 row">
                    {
                        imagenes.map( imagen => (
                            <Imagen key={imagen.id} imagen={imagen}/>
                        ))
                    }
                </div>
                <Paginacion
                    paginaAnterior={this.props.paginaAnterior}
                    paginaSiguiente={this.props.paginaSiguiente}
                    pagina={this.props.pagina}
                />
            </React.Fragment>
        );
        // console.log('mostrarImagenes')
    }

    render(){
        return (
            
           <React.Fragment>
                {this.mostrarImagenes() }               
           </React.Fragment>
        );
    }
}