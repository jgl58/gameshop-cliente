import React from 'react'
import ReactDOM from 'react-dom' 
import {reactLocalStorage} from 'reactjs-localstorage'
import API from './API/API'

class Pedidos extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            pedidos: []
        }
    }
    

    componentWillMount(){
        new API().obtenerPedidos()
        .then((data) => {
            console.log(data) 
            this.setState({pedidos: data.orders}) 
        })
    }

    render(){

        var prods = []
        for (var i=0; i<this.state.pedidos.length; i++) {
            var actual = this.state.pedidos[i]
            if(actual.processed == 1){
                var elemento
                //console.log(actual)
                elemento = <PedidoItem key={i} pedido={actual}/> 
                prods.push(elemento)
            } 
        }
        return <div className="panel panel-default panel-table">
              <div className="panel-heading">
                <div className="row">
                  <div className="col col-xs-6">
                    <h3 className="panel-title">Tus juegos</h3>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <table className="table table-striped table-bordered table-list">
                  <thead>
                    <tr>
                        <th>Comprado</th>
                        <th>Precio</th>
                        <th>Juego</th>
                    </tr> 
                  </thead>
                  <tbody>
                        {prods}
                    </tbody>
                </table>
              </div>
            </div>
    }
}

class PedidoItem extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        if(this.props.pedido.processed == 1){
            return <tr>
                <td align="center">Pagado
                </td>
                <td>{this.props.pedido.price} €</td>
                <td>{this.props.pedido.title}</td>
            </tr>
        }else{
            return <tr>
            <td align="center">No pagado
            </td>
            <td>{this.props.pedido.price} €</td>
            <td>{this.props.pedido.title}</td>
            </tr>
        }
         
    }
}


export default Pedidos