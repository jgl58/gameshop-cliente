import React from 'react'
import {reactLocalStorage} from 'reactjs-localstorage'

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
            
            fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-type':'application/json'
                },
                body: json
            })
            .then((response) => {
                if(response.ok){
                    return response.json()
                }else{
                    alert("Nick ya en uso")
                }
                
            })
        }
   
    }

    render(){

        return <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">                            
                                <fieldset>
                                    <h2>Registro</h2>
                                    <hr className="colorgraph"></hr>
                                    <div className="form-group">
                                        <input type="text" name="email" id="email" onChange={(event) => this.setState({nick: event.target.value})} className="form-control input-lg" placeholder="Nick"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" id="password" onChange={(event) => this.setState({pass: event.target.value})} className="form-control input-lg" placeholder="Contraseña"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="confirmpassword" id="confirmpassword" onChange={(event) => this.setState({confirmpassword: event.target.value})} className="form-control input-lg" placeholder="Repita la contraseña"/>
                                    </div>
                                    <hr className="colorgraph"></hr>
                                    <div className="row">
                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                            <button className="btn btn-lg btn-success btn-block" onClick={this.registrar}>Registrate</button>
                                        </div>
                                    </div>
                                </fieldset>                            
                        </div>
                    </div>
                </div>
    }

}

export default Registro