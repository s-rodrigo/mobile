let express = require('express');
let consign = require('consign');
let compression = require('compression');

let app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./app/public'));

consign({ cwd:  'app' })
    .include('./routes')
    .then('./controllers')
    .then('./models')
    .then('./config/mongodb.js')
    .into(app);

module.exports = app;
