var path = require('path');
var dir_js = path.resolve(__dirname, 'js')
var dir_css = path.resolve(__dirname, 'css')
module.exports = {
    //archivo "inicial" por el que se empieza a ver las dependencias
    entry: path.resolve(dir_js,'main.js'),
    //bundle construido por webpack, uniendo archivo inicial y dependencias
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        //"filtros" por los que pasa el código antes de generar el bundle
        loaders: [
            {
                test: dir_css,
                use: [
                    'style-loader',
                    'css-loader'
                    
                ]
            },
            { 
                test: dir_js,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react']
                } 
            }
        ]
    },
    //para que podamos hacer debug sobre nuestro código original
    //aunque el navegador esté ejecutando el bundle
    devtool: 'source-map'
}
