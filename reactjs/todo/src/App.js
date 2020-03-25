import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './css/app.css';

// importando los componentes
import Header from './components/Header'
import Ordenes from './components/Ordenes'
import OrdenNueva from './components/OrdenNueva'
import Configuracion from './components/Configuracion'

class App extends Component {
  
  state = {
    ordenes: []
  }
  
  async componentDidMount(){
    // const ordenes = await localStorage.getItem("titulo");
    const ordenes = [
        {
        id: 1,
        nombre: "Señora",
        hora: '12:00',
        estatus: false,
        datos: [
          {
            nombre: 'flautas',
            cant: 3,
            guiso: 'Deshebrada'
          },
          {
            nombre: 'flautas',
            cant: 1,
            guiso: 'Huevo Verde'
          },
          {
            nombre: 'Tostadas',
            cant: 2,
            guiso: 'Chicharron'
          }
        ]
      }
    ]
    this.setState({ordenes})
    // console.log(data)
  }

  agregarOrden = () => {
    console.log("Orden nueva")
  }
  esconderRuta = () => {
    console.log("Hola")
  }

  render(){
    return (
      
      <div className="App container">
        <Header 
          activarMenu={activarMenu}
        />
      <Router>
          <div className="rutas">
            <Link to="/">Ordenes</Link>/
            <Link to="/conf">Conf</Link>
          </div>
        <Route exact path="/" >
          <Ordenes 
            ordenes={this.state.ordenes} 
          />
        </Route>
        <Route path="/conf">
          <Configuracion esconderRuta={this.esconderRuta}/>
        </Route>
        <Route path="/nueva">
          <OrdenNueva agregarOrden={this.agregarOrden}/>
        </Route>
      </Router>
      </div>
    );
  }
}

const activarMenu = () =>{
  console.log("activa el menu")
}


export default App;
