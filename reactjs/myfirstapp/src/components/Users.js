import React, {Component} from 'react'
// import fetch from 'fetch'


export default class Users extends Component{

    state = {
        users: []
    }
    
    async componentDidMount(){
        const users = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await users.json()
        this.setState({users: data})
        // console.log(data)
    }


    render(){
        return (
            <div>
                <h1>Usuarios</h1>
                {
                this.state.users.map(user => {
                    // console.log(user)
                    
                    return <div key={user.id}>
                        <h2>Nombre: {user.name} - {user.username}</h2>
                        <p>Teléfono: {user.phone}</p>
                        <p>Email: {user.email}</p>
                    </div>
                })
                }
            </div>
            
        );
    }
}