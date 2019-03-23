const express = require('express');
const app = express();
const morgan = require('morgan');
const root = require('./routes/router');
const expbhs = require('express-handlebars');//motor de plantillas como ejs
//pero este motor me exige crear dentro de views la carpeta partials y layouts.
const path = require('path');
//usaremos stripe servicio de pagos online.


//setting
app.set('port',process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views') );
app.engine('.hbs',expbhs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs',

}));
app.set('view engine', '.hbs');

//staticfile
app.use(express.static(path.join(__dirname, 'public')));

//midleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));

//routers

app.use(root);

//start Server 
app.listen(app.get('port'), ()=>{
    console.log('listen on port');
});
