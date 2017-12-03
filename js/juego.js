import React from 'react'
import API from './API/API'

class Juego extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        juego: [],
        links: []
      }
    }

    componentWillMount(){
      new API().obtenerJuego(this.props.id)
      .then((data) => {
        console.log(data)
          this.setState({juego: data.game[0]})
          this.setState({links: data._links})   
          console.log(this.state.juego)
      })
  }

    render () {
        for(var i=0;i<this.state.juego.length;i++){
          console.log(this.state.juego[i].title)
        }

        return <div className="item">
              <span className="titulo">{this.state.juego.title}</span>-
              <span className="precio">{this.state.juego.price}</span>€
            </div>
    }
}

export default Juego