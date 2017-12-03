import React from 'react'
import Home from './home'

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {logueado: false, nick: '', pass: ''}
       // this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.handleChangeNick = this.handleChangeNick.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
    }
    login(event) {
        var pet = {nick: this.state.nick, pass: this.state.pass};
        
        var json = JSON.stringify(pet)
        //console.log(pet)
        fetch('http://localhost:3000/login', {
            method: 'POST',
            body: json
        })
        .then((response) => {
            console.log(response.json())
            return response.json();
        })
        .then((resp) => {
            this.setState({logueado: true})
        })  
        
        this.setState({logueado: true})
    }

    logout(){
        this.setState({logueado: false})
    }

    handleChangeNick(event) {
        this.setState({nick: event.target.value});
    }
    
    handleChangePass(event) {
        this.setState({pass: event.target.value});
    }
    render() {
        if(!this.state.logueado){
            return <div>
                <form>
                    Nick: <input type="text" 
                    onChange={this.handleChangeNick}id="fname"></input><br></br>
                    Pass: <input type="password" 
                    onChange={this.handleChangePass} name="lname"></input><br></br>
                    <button onClick={(event) => this.login(event)}>Entrar</button>
                </form>
            </div> 
        }else{
            return <Home nick={this.state.nick} handleLogout={this.logout}></Home>
        }
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default Login
