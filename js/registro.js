import React from 'react'
import {reactLocalStorage} from 'reactjs-localstorage'
import '../css/login.css'
class Registro extends React.Component {

    constructor(props){
        super(props)
        this.state = {nick: '', pass: '', confirmpassword: ''}
        this.registrar = this.registrar.bind(this)
    }

    registrar(event) {
        if(this.state.pass == '' && this.state.confirmpassword == '' && this.state.nick == ''){
            alert("Introduce todos los datos")
        }
        else if(this.state.pass != this.state.confirmpassword){
            alert("Las contraseñas son distintas")
        }else{
            var pet = {nick: this.state.nick, pass: this.state.pass};
            
            var json = JSON.stringify(pet)
            console.log(json)
            fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-type':'application/json'
                },
                body: json
            })
            .then((response) => {
                if(response.ok){
                    this.props.log()
                }else{
                    alert("Nick ya en uso")
                }
                
            })
        }
   
    }

    render(){

        document.getElementById("miBody").style.backgroundImage = "linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33))";
        document.getElementById("miBody").style.height = "100%";
        return <div className="container">
                <div className="card card-container">
                    <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                    <p id="profile-name" className="profile-name-card">Registrate</p>
                    
                        <span id="reauth-email" className="reauth-email"></span>
                        <input type="text" name="email" id="email" onChange={(event) => this.setState({nick: event.target.value})} className="form-control input-lg" placeholder="Nick"/>
                        <br/>
                        <input type="password" name="password" id="password" onChange={(event) => this.setState({pass: event.target.value})} className="form-control input-lg" placeholder="Contraseña"/>
                        <br/> 
                        <input type="password" name="confirmpassword" id="confirmpassword" onChange={(event) => this.setState({confirmpassword: event.target.value})} className="form-control input-lg" placeholder="Repita la contraseña"/>
                        <br/>                   
                    
                        <button className="btn btn-lg btn-success btn-block btn-signin" onClick={this.registrar}>Registrate</button>
                    
                </div>
            </div>
    }

}

export default Registro