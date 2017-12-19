import React from 'react'
import API from './API/API'
import {reactLocalStorage} from 'reactjs-localstorage'
import '../css/login.css'

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {nick: '', pass: ''}
        this.login = this.login.bind(this)
    }
    login(event) {
        var pet = {nick: this.state.nick, pass: this.state.pass};
        var json = JSON.stringify(pet)
        
        new API().login(json)
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
                this.props.log()
        })  
    }

    render() {
    
        document.getElementById("miBody").style.backgroundImage = "linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33))";
        document.getElementById("miBody").style.height = "100%";

       return  <div className="container">
        <div className="card card-container">
            <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            <p id="profile-name" className="profile-name-card">Haz login</p>
            
                <span id="reauth-email" className="reauth-email"></span>
                <input type="text" name="email" id="email" onChange={(event) => this.setState({nick: event.target.value})} className="form-control input-lg" placeholder="Nick" required autoFocus/> 
                <br/>
                <input type="password" name="password" id="password" onChange={(event) => this.setState({pass: event.target.value})} className="form-control input-lg" placeholder="Contraseña" required/>
                <br/>                    
            
                <button className="btn btn-lg btn-success btn-block btn-signin" onClick={(event) => this.login(event)}>Iniciar Sesión</button>
            
        </div>
    </div>
    }
}



//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default Login
