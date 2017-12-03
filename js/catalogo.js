import React from 'react'
import CatalogoItem from './catalogoItem'

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
            elemento = <CatalogoItem game={actual} handleAcceder={this.acceder}/> 
            prods.push(elemento)
        }
        return <div>
            <p>Catalogo</p>
            {prods}
        </div> 
    }
}

export default Catalogo