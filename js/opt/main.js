//var API = require('../API/API.js')
import API from '../API/API'
var handlebars = require('handlebars')
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaWNrIjoiam9uYXkiLCJwYXNzIjoicGFzcyIsImlkVXNlciI6MX0.OWlvywDUCxVZzkTTvVHhOJ5UpGsQfDk-_GQ96AfjYvs"

//Plantilla handlebars para renderizar en HTML un item de la lista
//Usamos backticks (funcionalidad de ES6) para delimitar la cadena para que pueda ser multilínea
//Con el "javascript:" en el href conseguimos que un enlace pueda llamar a código JS
var templateItem = `
   <div>
      <span id="{{id}}">
         <strong>id: {{comments_id}} {{nick}}</strong> - <em>{{message}}</em>
      </span>   
      <a id="enlace_{{id}}" href="javascript:borrar({{comments_id}})">Borrar</a>
   </div>
`

//Plantilla Handlebars para renderizar en HTML la lista de la compra
//1. El "." significa el objeto del nivel "actual", en nuestro caso es el array
//por el que vamos a iterar con handlebars
//2. El ${} nos permite interpolar variables (funcionalidad de ES6). Es solo por no
//andar concatenando cadenas, esto queda más elegante
var templateLista = `
 <h2>Comentarios</h2>
 {{#.}}
   ${templateItem}
 {{/.}}
` 

var templateDetalles = `
  <span id="detalles_{{id}}">
    {{detalles}}
  </span>
`

//Compilamos las plantillas handlebars. Esto genera funciones a las que llamaremos luego
var tmpl_lista_compilada = handlebars.compile(templateLista)
var tmpl_item_compilada = handlebars.compile(templateItem)
var tmpl_detalles_compilada = handlebars.compile(templateDetalles)

//manejador de eventos para cuando se carga la página
//le pedimos la lista de items al servidor y la pintamos en el HTML
document.addEventListener('DOMContentLoaded', function(){
    console.log("Página cargada!: " +  new Date().toLocaleString())
	new API().obtenerJuego(2).then(function(datos) {
		//mezclamos los datos con el HTML de la plantilla para obtener el HTML resultado
		var listaHTML = tmpl_lista_compilada(datos.comments)
		//insertamos el HTML en la página
		document.getElementById("miComponente").innerHTML = listaHTML
	})
})

//manejador de eventos para el botón de "Añadir" item a la lista
document.getElementById('boton_add_item').addEventListener('click', function(){
   //Creamos un objeto JS con los datos del nuevo item	
   var nuevo = document.getElementById('nuevo_comentario').value
   var json = JSON.stringify({message:nuevo})
   
   fetch('http://localhost:3000/games/2/comments', {
	method: 'POST',
	headers: {
		'Content-type':'application/json',
		'Authorization': token
	},
	body: json
	})
	.then((response) => {
		new API().obtenerJuego(2).then(function(datos) {
			//mezclamos los datos con el HTML de la plantilla para obtener el HTML resultado
			var listaHTML = tmpl_lista_compilada(datos.comments)
			//insertamos el HTML en la página
			document.getElementById("miComponente").innerHTML = listaHTML
		})    
	}) 
 
})

document.getElementById('boton_edit_item').addEventListener('click', function(){
	//Creamos un objeto JS con los datos del nuevo item	
	var nuevo = document.getElementById('editar_comentario').value
	var id = document.getElementById('id_comentario').value

	var json = JSON.stringify({newMessage: nuevo})
    
    //console.log(json)
    fetch('http://localhost:3000/games/2/comments/'+id, {
          method: 'PUT',
          headers: {
              'Content-type':'application/json',
              'Authorization': token
          },
          body: json
      })
      .then((response) => {
		new API().obtenerJuego(2).then(function(datos) {
			//mezclamos los datos con el HTML de la plantilla para obtener el HTML resultado
			var listaHTML = tmpl_lista_compilada(datos.comments)
			//insertamos el HTML en la página
			document.getElementById("miComponente").innerHTML = listaHTML
		})    
      }) 
	
 })

//llamada cuando pulsamos en un enlace "Detalles"
function borrar(id) {

	fetch('http://localhost:3000/games/2/comments/'+id, {
		method: 'DELETE',
		headers: {
			'Content-type':'application/json',
			'Authorization': token
		}
	})
	.then((response) => {
		new API().obtenerJuego(2).then(function(datos) {
			//mezclamos los datos con el HTML de la plantilla para obtener el HTML resultado
			var listaHTML = tmpl_lista_compilada(datos.comments)
			//insertamos el HTML en la página
			document.getElementById("miComponente").innerHTML = listaHTML
		})    
	})
	
}
window.borrar = borrar
