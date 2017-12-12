import React from 'react'
import API from './API/API'
import '../css/carrito.css'
import {reactLocalStorage} from 'reactjs-localstorage'

class Carrito extends React.Component{
    
        constructor(props){
            super(props)
            this.state = {carrito: []}
            this.pagar = this.pagar.bind(this)
            this.setCarrito = this.setCarrito.bind(this)
        }

        componentWillMount(){
            new API().obtenerPedidos()
            .then((data) => {
                //this.setState({carrito: data.orders})
                this.setCarrito(data.orders)
            })
        }
        componentDidUpdate(){

        }

        setCarrito(data){
            this.setState({carrito: data})
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
        render(){
            var prods = []
            var cont = 0
            for (var i=0; i<this.state.carrito.length; i++) {
                var actual = this.state.carrito[i]
                if(actual.processed == 0){
                    var elemento
                    cont++
                    elemento = <CarritoItem borrado={this.refresh} key={i} pedido={actual}/> 
                    prods.push(elemento)
                } 
            }
            if(cont == 0){
                return <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"> <span className="glyphicon glyphicon-shopping-cart"></span> {cont} - Items<span className="caret"></span></a>
                <ul className="dropdown-menu dropdown-cart" role="menu">
                    El carrito esta vacio
                    <li className="divider"></li>
                    <li><a className="btn btn-success" onClick={this.pagar} href="#">Pagar</a></li>
                </ul>
            </li>
            }else{ 
                return <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"> <span className="glyphicon glyphicon-shopping-cart"></span> {cont} - Items<span className="caret"></span></a>
                        <ul className="dropdown-menu dropdown-cart" role="menu">
                            {prods}
                            <li className="divider"></li>
                            <li><a className="btn btn-success" onClick={this.pagar} href="#">Pagar</a></li>
                        </ul>
                    </li>
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

    export default Carrito