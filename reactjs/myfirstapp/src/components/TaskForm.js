import React, {Component} from 'react'
export default class TaskForm extends Component{

    state = {
        title: '',
        description: ''
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.addTask(this.state)
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        
        return (
            <form onSubmit={this.onSubmit}>
                <input 
                    type="text" 
                    placeholder="Escribe una tarea" 
                    onChange={this.onChange} value={this.state.title} 
                    name="title" />
                <br/>
                <br/>
                <textarea 
                    placeholder="Escribe una descripción" 
                    onChange={this.onChange} 
                    value={this.state.descripion} 
                    name="description">
                </textarea>
                <input type="submit"/>
            </form>
        )
    }
}

// export default TaskForm