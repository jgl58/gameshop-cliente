import {reactLocalStorage} from 'reactjs-localstorage'
class API  {
    constructor() {
        this.API_URL = 'http://localhost:3000/'
    }

    obtenerJuegos() {
        return fetch(this.API_URL+"games")
            .then(function(response) {
                //if (response.ok)
                
                    return response.json()
            })
    }

    obtenerPerfil() {
        return fetch(this.API_URL+"users/"+reactLocalStorage.get('idUser'), {
            headers: {
                'Authorization': reactLocalStorage.get('token')
            },
        })
        .then(function(response) {
                return response.json()
        })
    }

    obtenerPedidos(){
        return fetch(this.API_URL+"users/"+reactLocalStorage.get('idUser')+"/orders", {
            headers: {
                'Authorization': reactLocalStorage.get('token')
            },
        })
        .then(function(response) {
                return response.json()
        })
    }

    obtenerJuego(id) {
        return fetch(this.API_URL+"games/"+id)
            .then(function(response) {
                //if (response.ok)
                    return response.json()
            })
    }

    crearComentario(idGame, json){
        var token = reactLocalStorage.get('token')
        return fetch('http://localhost:3000/games/'+idGame+'/comments', {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
                'Authorization': token
            },
            body: json
        })
    }
    borrarComentario(idGame, idComment){
        var token = reactLocalStorage.get('token')
        return fetch('http://localhost:3000/games/'+idGame+'/comments/'+idComment, {
            method: 'DELETE',
            headers: {
                'Content-type':'application/json',
                'Authorization': token
            }
        })
    }

    editarComentario(idGame, idComment,json){
    var token = reactLocalStorage.get('token')
       return fetch('http://localhost:3000/games/'+idGame+'/comments/'+idComment, {
            method: 'PUT',
            headers: {
                'Content-type':'application/json',
                'Authorization': token
            },
            body: json
        })
    }

    pagar(idGame){
        var token = reactLocalStorage.get('token')
        return fetch('http://localhost:3000/games/'+idGame+'/orders', {
              method: 'POST',
              headers: {
                  'Content-type':'application/json',
                  'Authorization': token
              }
          })
    }

    borrarPedido(idUser,idPed){
        var token = reactLocalStorage.get('token')
        //console.log(json)
        return fetch('http://localhost:3000/users/'+idUser+'/orders/'+idPed, {
              method: 'DELETE',
              headers: {
                  'Content-type':'application/json',
                  'Authorization': token
              }
          })
    }

    login(json){
        return fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: json
        })
    }

    registro(json){
        return fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: json
        })
    }

}

export default API