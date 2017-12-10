import React from 'react'
import Catalogo from './catalogo'
import Juego from './juego'
import Login from './login'
import Registro from './registro'
import Perfil from './perfil'
import {reactLocalStorage} from 'reactjs-localstorage'
class Home extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            mostrar: 'catalogo',
            game_id: 0
        }
        this.setGame = this.setGame.bind(this)
        this.setMostrar = this.setMostrar.bind(this)
        
    }

    setMostrar(data){
        console.log(data)
        this.setState({mostrar: data})
    }

    setGame(id){
        this.setState({mostrar: 'juego'})
        this.setState({game_id: id})
    }


    render() {

        switch(this.state.mostrar){
            case 'catalogo':
                return <div>
                    <Nav volver={this.setMostrar} log={this.setMostrar}/>
                    <Catalogo accederJuego={this.setGame}/>
                    </div>
            
            case 'juego':
                return <div>
                    <Nav volver={this.setMostrar} log={this.setMostrar}/>
                    <Juego id={this.state.game_id} key={this.state.game_id}/>
                    </div>

            case 'login':
                return <div>
                        <Nav volver={this.setMostrar} log={this.setMostrar}/>
                        <Login log={this.setMostrar}/>
                    </div>
            case 'registro':
                return <div>
                        <Nav volver={this.setMostrar} log={this.setMostrar}/>
                        <Registro/>
                    </div>

            case 'perfil':
                return <div>
                        <Nav volver={this.setMostrar} log={this.setMostrar}/>
                        <Perfil log={this.setMostrar}/>
                    </div>

        }
        
         
    }
}


class Nav extends React.Component{

    constructor(props){
        super(props)
        this.back = this.back.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }

    back(){
        this.props.volver('catalogo')
    }

    login(){
        this.props.log('login');
    }

    logout(){
        reactLocalStorage.clear()
        this.back()
    }

    render(){
        if(reactLocalStorage.get('token')){
            var user = reactLocalStorage.get('nick')
            return <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                        <a className="navbar-brand" href="#" onClick={this.back}>GameShop</a>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                        <li><a href="#" onClick={(event) => this.props.log('perfil')}><span className="glyphicons glyphicons-user"></span>Hola {user}</a></li>
                        <li><a href="#" onClick={this.logout}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
                        </ul>
                    </div>
                    </nav>
        }else{
            return <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                        <a className="navbar-brand" href="#" onClick={this.back}>GameShop</a>
                        </div>
                        <ul className="nav navbar-nav">
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                        <li><a href="#" onClick={(event) => this.props.log('registro')}><span className="glyphicon glyphicon-user"></span> Registrarse</a></li>
                        <li><a href="#" onClick={this.login}><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                        </ul>
                    </div>
                    </nav>

        }
    }
}


//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default Home
