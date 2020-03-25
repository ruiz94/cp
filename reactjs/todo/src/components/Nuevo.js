import React, {Component} from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import Configuracion from './Configuracion';

export default class Nuevo extends Component{
    render(){
        return(
            <div>
                {this.props.esconderRuta()}
                <BrowserRouter>
                    <Route path="/conf" component={Configuracion}/>
                    <Route exact path="/nuevo">
                        <p>
                            <Link to="/conf">Regresar</Link>
                        </p>
                        <form>
                            <legend>Nuevo Producto</legend>
                            <div className="form-group">
                                <label className="col-form-label">Default input</label>
                                <input type="text" className="form-control" placeholder="Default input" id="inputDefault"/>
                            </div>
                        </form>

                    </Route>
                </BrowserRouter>
            </div>
        );
    }
}