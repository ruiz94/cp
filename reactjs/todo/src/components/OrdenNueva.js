import React, {Component} from 'react'; 

export default class OrdenNueva extends Component{
    render(){
        return (
            <div>
                {this.props.agregarOrden()}
            </div> 
        );
    }
}