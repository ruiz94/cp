import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import './App.css';

// Importando los componentes
import tasks from './sample/tasks.json'
import Tasks from './components/Tasks'
import TaskForm from './components/TaskForm'
import Users from './components/Users'

class App extends Component{

  state = {
    tasks: tasks
  }

  addTask = (form) => {
    const newTask = {
      title: form.title,
      description: form.description,
      id: this.state.tasks.length
    }
    this.setState({
      tasks: [...this.state.tasks, newTask]
    })
    console.log("add task", newTask)
  }

  updateTask = (id) => {
    const newTasks = this.state.tasks.map(task => task.id !== id)
    this.setState({tasks:newTasks})
  }
  // updateTask = (id) => {
  //   const newTasks = this.state.tasks.map(e => {
  //     if(e.id === id){
  //       e.done = !e.done
  //     }
  //     return e
  //   })
  //   this.setState({tasks:newTasks})
  // }

  deleteTask = id => {
    const newTasks = this.state.tasks.filter( task => {
      if(task.id !== id)
        return task
      return false
    })
    this.setState({tasks:newTasks})
  }



  render(){
    return <div>
      <Router>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Route exact path="/" render={()=>{
          return <div>
            <TaskForm addTask={this.addTask}/>
            <Tasks 
              updateTask={this.updateTask} 
              deleteTask={this.deleteTask} 
              tasks={this.state.tasks}/>
          </div>
        }}>
        </Route>
        <Route path="/users" component={Users}/>
      </Router>
    </div>
  }
}


// class Helloworld extends React.Component {
  // state = {
  //   show: true
  // }

  // toggleShow = () => {
  //   this.setState({
  //     show: !this.state.show
  //   })
  // }
  
//   render(){
//     if (this.state.show) {
//       return (
//         <div id="hello">
//           {this.props.nombre} - 
//           {this.props.subtitulo} - 
//           <button onClick={this.toggleShow}>Cambair estado</button>
//         </div>
//       );
//     }else{
//       return <h1>No hay elementos - <button onClick={this.toggleShow}>Cambiar estado</button> </h1> 
//     }
    
//   }
// }

// const App = () => <div>Este es un componente: <Helloworld/></div>

// class App extends React.Component {
//   render(){
//     return <div>Este es un componente: 
//       <Helloworld nombre="Hola tu" subtitulo="Es un subtitulo"/>
//       <Helloworld nombre="jajajja" subtitulo="es el 2do subtitulo"/>
//     </div>
//   }
// }

// function App() {
//   return (
//     <div >TMi cmoponente: <Helloworld/><Helloworld/><Helloworld/><Helloworld/></div>
//   );
// }

export default App;
