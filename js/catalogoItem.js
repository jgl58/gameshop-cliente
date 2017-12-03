import React from 'react'


class CatalogoItem extends React.Component {
    constructor(props) {
      super(props)
      this.acceder = this.acceder.bind(this)
    }

    acceder(event){
        this.props.handleAcceder(this.props.game.games_id)
    }

    render () {
        return <div className="item">
              <span className="titulo">{this.props.game.title}</span>-
              <span className="precio">{this.props.game.price}</span>€
                <button onClick={this.acceder}>Acceder</button>
            </div>
    }
}

export default CatalogoItem