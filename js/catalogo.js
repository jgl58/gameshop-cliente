import React from 'react'
import '../css/catalogo.css'
import API from './API/API'

class Catalogo extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        juegos: [],
        links: []
      }
    this.acceder = this.acceder.bind(this)
    }
    
    componentWillMount(){
        new API().obtenerJuegos()
        .then((data) => {
            this.setState({juegos: data.games})
            this.setState({links: data.links})   
        })
    }

    acceder(id){
        this.props.accederJuego(id)
    }

    render () {
        var prods = []
        for (var i=0; i<this.state.juegos.length; i++) {
            var actual = this.state.juegos[i]
            var elemento
            //console.log(actual)
            elemento = <CatalogoItem key={i} game={actual} handleAcceder={this.acceder}/> 
            prods.push(elemento)
        }
    
        return<div>
        <div className="jumbotron text-center">
            <h1>GameShop</h1>
            <p>OFERTAS BLACK FRIDAY</p> 
        </div>

            <div className="container">
            <div className="layout">
                <section className="inner">
                    <ul className="grid">
                        {prods}
                    </ul>
                </section>
            </div> 
        </div>
    </div>

    

    }
}


class CatalogoItem extends React.Component {
    constructor(props) {
      super(props)
      this.acceder = this.acceder.bind(this)
    }

    acceder(event){
        this.props.handleAcceder(this.props.game.games_id)
    }

    render () {
        return <li className="grid-tile">
                <div className="item">
                    <div className="item-img">
                        <img width="275" height="250" src={this.props.game.url}/>
                    </div>
                    <div className="item-pnl">
                        <div className="pnl-wrapper">
                            <div className="pnl-description">
                                <span className="pnl-label">{this.props.game.title}</span>
                                <span className="pnl-price">{this.props.game.price} €</span>
                                <button className="btn btn-primary pull-right" onClick={this.acceder}>Acceder</button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
    }
}

export default Catalogo
