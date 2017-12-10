import React from 'react'
import '../css/perfil.css'
import ReactDOM from 'react-dom' 
import {reactLocalStorage} from 'reactjs-localstorage'
import API from './API/API'

class Perfil extends React.Component {
    constructor(props){
        super(props)
        this.state = {user: []}
        this.editado = this.editado.bind(this)
    }

    componentWillMount(){
        console.log(reactLocalStorage.get('idUser'))
        new API().obtenerPerfil()
        .then((data) => {
            
            this.setState({user: data.profile}) 
            console.log(this.state.user) 
        })
    }

    editado(data){
        
        this.setState({user: data.profile}) 
    }

    render(){
        return <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
        <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">Perfil</h3>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-3 col-lg-3 " align="center"></div>
            
            <div className=" col-md-9 col-lg-9 "> 
              <table className="table table-user-information">
                <tbody>
                  <tr>
                    <td>Nick:</td>
                    <td>{this.state.user.nick}</td>
                  </tr>
                  <tr>
                    <td>Nombre:</td>
                    <td>{this.state.user.name}</td>
                  </tr>
                  <tr>
                    <td>Apellidos</td>
                    <td>{this.state.user.lastname}</td>
                  </tr>
                 
                </tbody>
              </table>
              
              <a href="#" className="btn btn-primary">Mis juegos</a>
            </div>
          </div>
        </div>
             <div className="panel-footer">
                    <a data-original-title="Broadcast Message" data-toggle="tooltip" type="button" className="btn btn-sm btn-primary"><i className="glyphicon glyphicon-envelope"></i></a>
                    <span className="pull-right">
                        <a href="#" data-original-title="Edit this user" data-toggle="modal" data-target="#myModal" type="button" className="btn btn-sm btn-warning"><i className="glyphicon glyphicon-edit"></i></a>
                    </span>
                </div>
                <EditarUser user={this.state.user} editado={this.editado}/>
        </div>
        </div>
    }
}

class EditarUser extends React.Component {
    
      constructor(props){
        super(props)
        this.state = {newNombre: '', newApellido: ''}
        this.editar = this.editar.bind(this)
      }
    

      editar(event){
        var token = reactLocalStorage.get('token')
        var nombre = this.props.user.name
        var apellido = this.props.user.lastname
        if(this.state.newNombre != ''){
            nombre = this.state.newNombre
        }
        if(this.state.newApellido != ''){
            apellido = this.state.newApellido
        }
        var json = JSON.stringify({newData: {nick: this.props.user.nick, pass: this.props.user.pass, name: nombre, lastname: apellido}})
        
        fetch('http://localhost:3000/users/'+reactLocalStorage.get('idUser'),{
              method: 'PUT',
              headers: {
                  'Content-type':'application/json',
                  'Authorization': token
              },
              body: json
          })
          .then((response) => {
              
              if(response.ok){
                 new API().obtenerPerfil()
                .then((data) => {
                    this.props.editado(data)
                })
                  //$('#myModal').modal('hide')
              }else{
                  alert('Datos incorrectos')
              }     
          }) 
      }
    
      render(){ 
       return <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                <h4 className="modal-title" id="myModalLabel"><i className="fa fa-share-alt"></i> Editar perfil</h4>
              </div>
              <div className="modal-body">
                <h4><i className="fa fa-envelope"></i>{this.props.user.nick}</h4>
                    <table className="table table-user-information">
                        <tbody>
                        <tr>
                            <td>Nombre:</td>
                            <td><textarea className="form-control" onChange={(event) => this.setState({newNombre: event.target.value})} placeholder={this.props.user.name}></textarea><br/>
                    </td>
                        </tr>
                        <tr>
                            <td>Apellidos</td>
                            <td><textarea className="form-control" onChange={(event) => this.setState({newApellido: event.target.value})} placeholder={this.props.user.lastname}></textarea><br/>
                    </td>
                        </tr>
                        
                        </tbody>
                    </table>
                    <br />
                    <button value="sub" name="sub" className="btn btn-warning" data-dismiss="modal" onClick={this.editar}>Editar</button>
                    <button type="button" className="btn btn-danger pull-right" data-dismiss="modal">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      }
    }

export default Perfil