import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

// importar componentes
import Nuevo from './Nuevo'

export default class Configuracion extends Component{
    render(){
        return(
            <div>
                <Router>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...1</div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...2</div>
                    <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...3</div>
                </div>
                    <Route exact path="/conf">
                        <Link to="/nuevo">
                            <button type="button" className="btn btn-success">Nuevo</button>
                        </Link>
                    </Route>
                    <Route path="/nuevo">
                        <Nuevo esconderRuta={this.props.esconderRuta}/>
                    </Route>
                </Router> 
                
            </div>
        );
    }
}