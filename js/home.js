import React from 'react'
import Catalogo from './catalogo'
import Juego from './juego'
import Login from './login'
import Registro from './registro'
import Perfil from './perfil'
import Pedidos from './pedidos'
//import Carrito from './carrito'
import API from './API/API'
import {reactLocalStorage} from 'reactjs-localstorage'
class Home extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            mostrar: 'catalogo',
            game_id: 0,
            carrito: []
        }
        this.setGame = this.setGame.bind(this)
        this.catalogo = this.catalogo.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.perfil = this.perfil.bind(this)
        this.registro = this.registro.bind(this)
        this.pedidos = this.pedidos.bind(this)
        this.pagar = this.pagar.bind(this)
        this.loadCarrito = this.loadCarrito.bind(this)
    }

    componentWillMount(){
        if(reactLocalStorage.get('token')){
            new API().obtenerPedidos()
            .then((data) => {
                //this.setState({carrito: data.orders})
                this.setState({carrito: data.orders})
            })
        }
        
    }
    catalogo(){
        this.setState({mostrar: 'catalogo'})
    }
    perfil(){
        this.setState({mostrar: 'perfil'})
    }
    registro(){
        this.setState({mostrar: 'registro'})
    }
    pedidos(){
        this.setState({mostrar: 'pedidos'})
    }
    login(){
        this.setState({mostrar: 'login'})
    }
    setGame(id){
        this.setState({mostrar: 'juego'})
        this.setState({game_id: id})
    }
    logout(){
        reactLocalStorage.clear()
        this.catalogo()
    }

    loadCarrito(){
        new API().obtenerPedidos()
        .then((data) => {
            //this.setState({carrito: data.orders})
            this.setState({carrito: data.orders})
        })
    }
    pagar(event){
        for (var i=0; i<this.state.carrito.length; i++) {
            var actual = this.state.carrito[i]
            if(actual.processed == 0){
            var token = reactLocalStorage.get('token')
        
            fetch('http://localhost:3000/users/'+reactLocalStorage.get('idUser')+'/orders/'+actual.orders_id,{
                method: 'PUT',
                headers: {
                    'Content-type':'application/json',
                    'Authorization': token
                }
            })
            .then((response) => {    
                if(response.ok){
                    new API().obtenerPedidos()
                    .then((data) => {
                        this.setState({carrito: data.orders})
                    })
                }else{
                    alert('Datos incorrectos')
                }     
            }) 
            } 
        }
    }

    

    render() {
        //CARRITO
        document.getElementById("miBody").style.backgroundColor = "rgb(85, 151, 95);"
        var carrito=[]
        var cont = 0
        var aux
        for (var i=0; i<this.state.carrito.length; i++) {
            var actual = this.state.carrito[i]
            if(actual.processed == 0){
                var elemento
                cont++
                elemento = <CarritoItem borrado={this.loadCarrito} key={i} pedido={actual}/> 
                carrito.push(elemento)
            } 
        }
        if(cont == 0){
            aux = <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"> <span className="glyphicon glyphicon-shopping-cart"></span> {cont} - Items<span className="caret"></span></a>
            <ul className="dropdown-menu dropdown-cart" role="menu">
                El carrito esta vacio
                <li className="divider"></li>
            </ul>
        </li>
            
        }else{ 
            aux = <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"> <span className="glyphicon glyphicon-shopping-cart"></span> {cont} - Items<span className="caret"></span></a>
                    <ul className="dropdown-menu dropdown-cart" role="menu">
                        {carrito}
                        <li className="divider"></li>
                        <li><a className="btn btn-success" onClick={this.pagar} href="#">Pagar</a></li>
                    </ul>
                </li>
        }

        //NAVBAR
        var prods
        if(reactLocalStorage.get('token')){
            var user = reactLocalStorage.get('nick')
            var html = <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                        <a className="navbar-brand" href="#" onClick={this.catalogo} >GameShop</a>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                        {aux}
                        <li><a href="#" onClick={this.perfil}><span className="glyphicon glyphicon-user"></span> Hola {user}</a></li>
                        <li><a href="#" onClick={this.logout}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
                        </ul>
                    </div>
                    </nav>
                prods = html
        }else{
            if(this.state.mostrar == 'login'){
                var html = <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <a className="navbar-brand" href="#" onClick={this.catalogo}>GameShop</a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                    <li><a href="#" onClick={this.registro}><span className="glyphicon glyphicon-user"></span> Registrarse</a></li>
                    </ul>
                </div>
                </nav>
               prods = html
            }else if(this.state.mostrar == 'registro'){
                var html = <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <a className="navbar-brand" href="#" onClick={this.catalogo}>GameShop</a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                    <li><a href="#" onClick={this.login}><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                    </ul>
                </div>
                </nav>
               prods = html
            }else{
                var html = <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <a className="navbar-brand" href="#" onClick={this.catalogo}>GameShop</a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                    <li><a href="#" onClick={this.registro}><span className="glyphicon glyphicon-user"></span> Registrarse</a></li>
                    <li><a href="#" onClick={this.login}><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                    </ul>
                </div>
                </nav>
               prods = html
            }
            
        }

        switch(this.state.mostrar){
            case 'catalogo':
                return <div>
                    {prods}
                    <Catalogo accederJuego={this.setGame}/>
                    </div>
            
            case 'juego':
                return <div>
                    {prods}
                    <Juego id={this.state.game_id} loadCarrito={this.loadCarrito} key={this.state.game_id}/>
                    </div>

            case 'login':
                return <div>
                    {prods}
                        <Login log={this.catalogo}/>
                    </div>
            case 'registro':
                return <div>
                    {prods}
                        <Registro log={this.login}/>
                    </div>

            case 'perfil':
                return <div>
                    {prods}
                        <Perfil pedidos={this.pedidos}/>
                    </div>

            case 'pedidos':
                return <div>
                    {prods}
                        <Pedidos/>
                    </div>

        }
       
         
    }
}

class CarritoItem extends React.Component {
    constructor(props){
        super(props)
        this.borrar = this.borrar.bind(this)
    }

    borrar(event){
        var token = reactLocalStorage.get('token')
        //console.log(json)
        fetch('http://localhost:3000/users/'+this.props.pedido.users_id+'/orders/'+this.props.pedido.orders_id, {
              method: 'DELETE',
              headers: {
                  'Content-type':'application/json',
                  'Authorization': token
              }
          })
          .then((response) => {
              if(response.ok){
                this.props.borrado()
                  //$('#myModal').modal('hide')
              }else{
                  alert('Datos incorrectos')
              }     
          }) 
      }
    render(){
       return <li>
                <span className="item">
                <span className="item-left">
                    <span className="item-info">
                        <span>{this.props.pedido.title}</span>
                        <span>{this.props.pedido.price} €</span>
                    </span>
                </span>
                <span className="item-right">
                <button onClick={this.borrar} className="btn btn-danger pull-right">x</button>
                </span>
            </span>
            </li>
         
    }
}


/*
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
                        <Carrito carro={this.props.carro}/>
                        <li><a href="#" onClick={(event) => this.props.log('perfil')}><span className="glyphicon glyphicon-user"></span> Hola {user}</a></li>
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
                        <ul className="nav navbar-nav navbar-right">
                        <li><a href="#" onClick={(event) => this.props.log('registro')}><span className="glyphicon glyphicon-user"></span> Registrarse</a></li>
                        <li><a href="#" onClick={this.login}><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                        </ul>
                    </div>
                    </nav>

        }
    }
}
*/

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default Home
