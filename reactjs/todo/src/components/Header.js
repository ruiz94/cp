import React, {Component} from 'react';

export default class Header extends Component{
    render(){
        return(
            <React.Fragment>
                {/* <div className="cabecera">
                    <h3 className="title">App Ordenes</h3>
                    <div className="cont-ham" onClick={this.props.activarMenu}>
                        <span className="hamburger" ></span>

                    </div>
                </div>
                <div className="menu" >
                    <ul> 
                        <li className="li1">Inicio</li>
                        <li className="li2">Config</li>
                    </ul>
                </div> */}
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    {/* <a className="navbar-brand" href="#">Navbar</a> */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        </ul>
                    </div> */}
                </nav>
            </React.Fragment>
        );
    }
}