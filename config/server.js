let consign = require('consign');
let express = require('express');

let app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./app/public'));

consign()
    .include('./app/routes')
    .then('./app/controllers')
    .then('./app/models')
    .then('./config/mongodb.js')
    .into(app);

module.exports = app;