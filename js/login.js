import React from 'react'
import {reactLocalStorage} from 'reactjs-localstorage'

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {nick: '', pass: ''}
        this.login = this.login.bind(this)
    }
    login(event) {
        var pet = {nick: this.state.nick, pass: this.state.pass};
        var json = JSON.stringify(pet)
        
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: json
        })
        .then((response) => {
            if(response.ok){
                return response.json(); 
            }else{
                alert('Datos incorrectos')
            }     
        }).then((json) => {
               // console.log(json)
                reactLocalStorage.set('token',json.token)
                reactLocalStorage.set('idUser',json._links.user_id)
                reactLocalStorage.set('nick',this.state.nick)
                this.props.log("catalogo")
        })  
    }

    render() {
    
        return <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">  
                                <fieldset>
                                    <h2>Login</h2>
                                    <hr className="colorgraph"></hr>
                                    <div className="form-group">
                                        <input type="text" name="email" id="email" onChange={(event) => this.setState({nick: event.target.value})} className="form-control input-lg" placeholder="Nick"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" id="password" onChange={(event) => this.setState({pass: event.target.value})} className="form-control input-lg" placeholder="Contraseña"/>
                                    </div>
                                    <hr className="colorgraph"></hr>
                                    <div className="row">
                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                            <button className="btn btn-lg btn-success btn-block" onClick={(event) => this.login(event)}>Iniciar Sesión</button>
                                        </div>
                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                            <a href="#" onClick={(event) => this.props.log('registro')} className="btn btn-lg btn-primary btn-block">Registrate</a>
                                        </div>
                                    </div>
                                </fieldset>                            
                        </div>
                    </div>
                </div>
    }
}



//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default Login
