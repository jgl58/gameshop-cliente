class API_lista  {
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

    obtenerJuego(id) {
        return fetch(this.API_URL+"games/"+id)
            .then(function(response) {
                //if (response.ok)
                    return response.json()
            })
    }
    addItem(item) {
        return fetch(this.API_URL, {
                   method: 'POST',
                   headers: {
                       'Content-type':'application/json'
                   },
                   body: JSON.stringify(item)
               }).then(function (respuesta) {
                   if (respuesta.ok)
                      return respuesta.json()
               })
    }
}

export default API_lista