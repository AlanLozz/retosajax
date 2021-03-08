const express = require('express');
const morgan = require('morgan');
const engine = require('ejs-mate');
const multer = require('multer');
const path = require('path');
const app = express();

//Settings
app.set('port',process.env.PORT || 7000);
app.set('views','views');
app.engine('ejs',engine);
app.set('view engine','ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(multer({dest:path.join(__dirname, '/public/images/uploads')}).single('image'));


app.use(require('./router/peliculas'));

app.listen(app.get('port'),()=>{
    console.log(`Servicio en el puerto ${app.get('port')}`);
});