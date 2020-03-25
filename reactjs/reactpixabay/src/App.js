import React, {Component} from 'react';

// importamos los componentes
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('start')
  }

  paginaAnterior = () => {

    // leer el state de la página actual
    let pagina = this.state.pagina
    // validar que la pagina sea mayor que uno
    if(pagina === 1) return null;
    // restar uno a la página actual
    pagina--
    // agregar el cambio al state
    this.setState({pagina}, () => {
      this.consultarApi();
      this.scroll();
    })
  }

  paginaSiguiente = () => {
    // leer el state de la página actual
    let pagina = this.state.pagina
    // sumar uno a la página actual
    pagina++
    // agregar el cambio al state
    this.setState({pagina}, () => {
      this.consultarApi();
      this.scroll();
    })
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=15566957-04ce6ecd54940db6e0c223578&q=${termino}&page=${pagina}`;
    fetch(url)
    .then(respuesta => respuesta.json() )
    .then(resultado => this.setState({imagenes: resultado.hits}) )
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino,
      pagina: 1
    }, () => {
      this.consultarApi();
    })
  }

  render(){
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
          <Buscador
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
            pagina={this.state.pagina}
          />
        </div>
      </div>
    );
  }
}

export default App;
