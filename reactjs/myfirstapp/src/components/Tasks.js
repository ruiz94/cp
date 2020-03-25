import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Task from './Task'

class Tasks extends Component {
    render(){
        return this.props.tasks.map( task => <Task 
            updateTask={this.props.updateTask} 
            deleteTask={this.props.deleteTask} 
            key={task.id} 
            task={task}/>) 
    }
}

Tasks.propTypes = {
    tasks: PropTypes.array.isRequired
}
export default Tasks