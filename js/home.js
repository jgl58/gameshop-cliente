import React from 'react'
import Catalogo from './catalogo'
import Juego from './juego'
class Home extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            mostrar: 'catalogo',
            game_id: 0
        }
        this.setGame = this.setGame.bind(this)
        
    }

    setMostrar(data){
        this.setState({mostrar: data})
    }

    setGame(id){
        this.setState({mostrar: 'juego'})
        this.setState({game_id: id})
    }


    render() {
        switch(this.state.mostrar){
            case 'catalogo':
                return <Catalogo accederJuego={this.setGame}/>
            
            case 'juego':
                console.log("ID del juego " + this.state.game_id)
                return <Juego id={this.state.game_id}/>
        }
         
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default Home
