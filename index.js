require('dotenv').config();

let server = require('./app/config/server');
const PORT = process.env.PORT || 8080;


server.listen(PORT, () => console.log('Server On'));
