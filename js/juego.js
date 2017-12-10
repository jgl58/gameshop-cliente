import React from 'react'
import ReactDOM from 'react-dom'  
import API from './API/API'
import {reactLocalStorage} from 'reactjs-localstorage'


class Juego extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        juego: [],
        links: [],
        comentarios: [],
        nuevoComentario: ''
      }
      this.comentar = this.comentar.bind(this)
      this.refresh = this.refresh.bind(this)
    }

    componentWillMount(){
      new API().obtenerJuego(this.props.id)
      .then((data) => {
          this.setState({juego: data.game[0]})
          this.setState({links: data._links})
          this.setState({comentarios: data.comments})      
      })
  }

    comentar(event){
      var token = reactLocalStorage.get('token')
      var json = JSON.stringify({message:this.state.nuevoComentario})
      console.log(token)
      fetch('http://localhost:3000/games/'+this.props.id+'/comments', {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
                'Authorization': token
            },
            body: json
        })
        .then((response) => {
            if(response.ok){
              new API().obtenerJuego(this.props.id)
              .then((data) => {
                  this.setState({comentarios: data.comments})   
              })
            }else{
                alert('Datos incorrectos')
            }     
        }) 
    }
    refresh(){
      new API().obtenerJuego(this.props.id)
      .then((data) => {
          this.setState({comentarios: data.comments})   
      })
    }

    render () {
    
      var prods = []
        for (var i=0; i<this.state.comentarios.length; i++) {
            var actual = this.state.comentarios[i]
            var elemento
            
            elemento = <ComentarioItem refresh={this.refresh} key={i} comentario={actual}/> 
            prods.push(elemento)
        }
    if(reactLocalStorage.get('token')){
        return <div className="container-fluid">
          <div className="content-wrapper">	
          <div className="item-container">	
            <div className="container">	
              <div className="col-md-12">
                <div className="container service1-items col-sm-2 col-md-2 pull-left">
                  <center>
                    <a id="item-1" className="service1-item">
                      <img width="275" height="250" src={this.state.juego.url} alt=""></img>
                    </a>
                  </center>
                </div>

              </div>
              <div className="col-md-7">
                <div className="product-title">{this.state.juego.title}</div>
                <hr></hr>
                <div className="product-price">{this.state.juego.price} €</div>
                <hr></hr>
                <div className="btn-group cart">
                  <button type="button" className="btn btn-success">
                    Comprar 
                  </button>
                </div>
              </div>
            </div> 
          </div>

          <div className="container">
            <div className="row">
              <h2>Comentarios <div className="pull-right"> </div></h2>
            </div>
            <div className="row" id="addcomment">
                    <textarea className="form-control" onChange={(event) => this.setState({nuevoComentario: event.target.value})} placeholder="Escribe el contenido..."></textarea><br/>
                    <button className="btn btn-primary pull-right" onClick={this.comentar}>Enviar</button>
            </div>
            <hr/>
            {prods}
        </div>
        </div>
      </div>

      }else{
        return <div className="container-fluid">
          <div className="content-wrapper">	
          <div className="item-container">	
            <div className="container">	
              <div className="col-md-12">
                <div className="container service1-items col-sm-2 col-md-2 pull-left">
                  <center>
                    <a id="item-1" className="service1-item">
                      <img width="275" height="250" src={this.state.juego.url} alt=""></img>
                    </a>
                  </center>
                </div>

              </div>
              <div className="col-md-7">
                <div className="product-title">{this.state.juego.title}</div>
                <hr></hr>
                <div className="product-price">{this.state.juego.price} €</div>
                <hr></hr>
                <div className="btn-group cart">
                  <p>Para comprar necesitas estar logueado</p>
                </div>
              </div>
            </div> 
          </div>

          <div className="container">
            <div className="row">
              <h2>Comentarios <div className="pull-right"> </div></h2>
            </div>
            <hr/>
            {prods}
        </div>
        </div>
      </div>
      }
      
        
    }
}


class ComentarioItem extends React.Component {
    constructor(props) {
      super(props)
      this.refresh = this.refresh.bind(this)
    }
    refresh(){
      this.props.refresh()
    }
    render () {
      var id = "#"+this.props.comentario.comments_id
      var idborrar = "#mi-modal"+this.props.comentario.comments_id
      //console.log(this.props.comentario)
      if(this.props.comentario.nick == reactLocalStorage.get('nick')){
          return <div className="row comment">
          <div className="head">
              <small><strong className='user'>{this.props.comentario.nick}</strong></small>
          </div>    
          <p>{this.props.comentario.message}</p>
          <div><button className="btn btn-warning pull-right" data-toggle="modal" data-target={id}>Editar</button>
          <button className="btn btn-danger pull-right" data-toggle="modal" data-target={idborrar}>Eliminar</button></div>
          <ModalEditar editado={this.refresh} comentario={this.props.comentario}/>
          <ModalBorrar borrado={this.refresh} comentario={this.props.comentario}/>
          </div>
      }else{
          return <div className="row comment">
          <div className="head">
              <small><strong className='user'>{this.props.comentario.nick}</strong></small>
          </div>    
          <p>{this.props.comentario.message}</p>
          </div>
      }


       
    }
}
class ModalEditar extends React.Component {

  constructor(props){
    super(props)

    this.editar = this.editar.bind(this)
  }

  editar(event){
    var token = reactLocalStorage.get('token')
    var json = JSON.stringify({newMessage:this.state.updateComentario})
    
    //console.log(json)
    fetch('http://localhost:3000/games/'+this.props.comentario.game_id+'/comments/'+this.props.comentario.comments_id, {
          method: 'PUT',
          headers: {
              'Content-type':'application/json',
              'Authorization': token
          },
          body: json
      })
      .then((response) => {
          if(response.ok){
            this.props.editado()
              //$('#myModal').modal('hide')
          }else{
              alert('Datos incorrectos')
          }     
      }) 
  }

  render(){ 
    //console.log(this.props.comentario.comments_id)
   return <div className="modal fade" id={this.props.comentario.comments_id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
            <h4 className="modal-title" id="myModalLabel"><i className="fa fa-share-alt"></i> Editar comentario</h4>
          </div>
          <div className="modal-body">
            <h4><i className="fa fa-envelope"></i>Id: {this.props.comentario.comments_id} {this.props.comentario.nick}</h4>
            
                <div className="input-group">
                  <textarea className="form-control" onChange={(event) => this.setState({updateComentario: event.target.value})} placeholder={this.props.comentario.message}></textarea><br/>
                </div>
                <br />
                <button value="sub" name="sub" className="btn btn-warning" data-dismiss="modal" onClick={this.editar}>Editar</button>
                <button type="button" className="btn btn-danger pull-right" data-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  }
}

class ModalBorrar extends React.Component {
  
    constructor(props){
      super(props)
  
      this.borrar = this.borrar.bind(this)
    }
  
    borrar(event){
      var token = reactLocalStorage.get('token')
      
      //console.log(json)
      fetch('http://localhost:3000/games/'+this.props.comentario.game_id+'/comments/'+this.props.comentario.comments_id, {
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
      var idborrar = "mi-modal"+this.props.comentario.comments_id
      //console.log(this.props.comentario.comments_id)
     return <div className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id={idborrar}>
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title" id="myModalLabel">Borrar comentario</h4>
                </div>
                <div className="modal-footer">
                  <button type="button" data-dismiss="modal" className="btn btn-default" id="modal-btn-si" onClick={this.borrar}>Si</button>
                  <button type="button" data-dismiss="modal" className="btn btn-primary" id="modal-btn-no">No</button>
                </div>
              </div>
            </div>
          </div>
    }
  }
export default Juego