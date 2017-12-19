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
                <div className="row">
                    
                    {prods}
                        
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
        return <div className="col-sm-12 col-md-6 col-lg-4">

            <div className="card">
                <div className="card-image">
                    <img className="img-responsive" src={this.props.game.url}/>
                    
                </div>
                <div className="card-content">
                    <span className="card-title">{this.props.game.title}</span>                    
                    
                </div>
                <div className="card-action">
                    <button className="btn btn-primary pull-right" onClick={this.acceder}>Acceder</button>
                </div>
                <div className="card-reveal">
                    <span className="card-title">{this.props.game.price} €</span> <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    
                </div>
            </div>
        </div>
    }
}

export default Catalogo
