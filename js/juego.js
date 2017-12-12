import React from 'react'
import ReactDOM from 'react-dom'  
import API from './API/API'
import '../css/juego.css'
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
      this.comprar = this.comprar.bind(this)
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

    comprar(event){
      var token = reactLocalStorage.get('token')
      fetch('http://localhost:3000/games/'+this.props.id+'/orders', {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
                'Authorization': token
            }
        })
        .then((response) => {
            if(response.ok){
              //return response.json()
              this.props.loadCarrito() 
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
              return <div> 
              <div class="container">
                  <div class="card">
                      <div class="container-fliud">
                          <div class="wrapper row">
                              <div class="preview col-md-6 col-lg-8 col-xs-12">

                                  <div class="preview-pic tab-content">
                                      <div class="tab-pane active" id="pic-1"><img src={this.state.juego.url}/></div>
                                  </div>

                              </div>
                              <div class="details col-md-6 col-lg-8 col-xs-12">
                                  <div class="panel panel-default text-center">
                                      <h3><div class="panel-title">   Juego</div></h3>
                                      <hr/>
                                  <h4>{this.state.juego.title}</h4>
                                  </div>
                                  <div class="panel panel-default text-center">
                                  <div class="rating">
                                      <h3><div class="panel-title">  Categoria</div></h3>
                                      <hr/>
                                      <h4>{this.state.juego.type}</h4>
                                  </div>
                                  </div>
                                  <div class="panel panel-default text-center">
                                      <h3><div class="panel-title">  Precio</div></h3>
                                      <hr/>
                                      <h2><font color="green">{this.state.juego.price} €</font></h2>                 
                                  </div>
            
                                  <div class="text-center">
                                      <button class="btn btn-default" onClick={this.comprar}  type="button"><span class="glyphicon glyphicon-shopping-cart"></span>Añadir al carrito</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div id="comentarios" className="container">
                <div className="row">
                  <div class="panel panel-default widget">
                    <div class="panel-heading">
                        <span class="glyphicon glyphicon-comment"></span>
                        <h3 class="panel-title">
                            Comentarios</h3><br/>
                            <div className="row">
                            <textarea className="form-control" onChange={(event) => this.setState({nuevoComentario: event.target.value})} placeholder="Escribe el contenido..."></textarea><br/>
                            <button className="btn btn-primary pull-right" onClick={this.comentar}>Enviar</button>
                            </div>
                    </div>
                    <div class="panel-body">
                        <ul class="list-group">
                          {prods}
                        </ul>
                    </div>
                  </div>
                </div>   
              </div>
            </div>
      }else{
            return <div> 
              <div class="container">
                  <div class="card">
                      <div class="container-fliud">
                          <div class="wrapper row">
                              <div class="preview col-md-6 col-lg-8 col-xs-12">

                                  <div class="preview-pic tab-content">
                                      <div class="tab-pane active" id="pic-1"><img src={this.state.juego.url}/></div>
                                  </div>

                              </div>
                              <div class="details col-md-6 col-lg-8 col-xs-12">
                                  <div class="panel panel-default text-center">
                                      <h3><div class="panel-title">   Juego</div></h3>
                                      <hr/>
                                  <h4>{this.state.juego.title}</h4>
                                  </div>
                                  <div class="panel panel-default text-center">
                                  <div class="rating">
                                      <h3><div class="panel-title">  Categoria</div></h3>
                                      <hr/>
                                      <h4>{this.state.juego.type}</h4>
                                  </div>
                                  </div>
                                  <div class="panel panel-default text-center">
                                      <h3><div class="panel-title">  Precio</div></h3>
                                      <hr/>
                                      <h2><font color="green">{this.state.juego.price} €</font></h2>                 
                                  </div>
            
                                  <div class="text-center">
                                      Necesitas estar logueado para comprar    
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div id="comentarios" className="container">
                <div className="row">
                  <h2>Comentarios <div className="pull-right"> </div></h2>
                </div>
                <div className="row" id="addcomment">Necesitas estar logueado para escribir un comentario</div>
                <hr/>
                {prods}
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
        return <li class="list-group-item">
                <div class="row">
                    <div class="col-xs-2 col-md-1">
                        <img src="http://placehold.it/80" class="img-circle img-responsive" alt="" /></div>
                    <div class="col-xs-10 col-md-11">
                        <div>
                                Por: {this.props.comentario.nick}
                        </div>
                        <div class="comment-text">
                            {this.props.comentario.message}
                        </div>
                        <div class="action pull-right">
                            <button  data-toggle="modal" data-target={id}type="button" class="btn btn-primary btn-xs" title="Editar">
                                <span class="glyphicon glyphicon-pencil"></span>
                            </button>&nbsp;&nbsp;&nbsp;
                            <button data-toggle="modal" data-target={idborrar} type="button" class="btn btn-danger btn-xs" title="Borrar">
                                <span class="glyphicon glyphicon-trash"></span>
                            </button>
                            <ModalEditar editado={this.refresh} comentario={this.props.comentario}/>
                            <ModalBorrar borrado={this.refresh} comentario={this.props.comentario}/>
                        </div>
                    </div>
                </div>
            </li>

      }else{
        return <li class="list-group-item">
          <div class="row">
              <div class="col-xs-2 col-md-1">
                  <img src="http://placehold.it/80" class="img-circle img-responsive" alt="" /></div>
              <div class="col-xs-10 col-md-11">
                  <div>
                          Por: {this.props.comentario.nick}
                  </div>
                  <div class="comment-text">
                      {this.props.comentario.message}
                  </div>
                  <div class="action">
                  </div>
              </div>
          </div>
      </li>

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
            <h4><i className="fa fa-envelope"></i>{this.props.comentario.nick}</h4>
            
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