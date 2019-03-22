require('dotenv').config();

let server = require('./config/server');
const PORT = process.env.PORT || 8080;


server.listen(PORT, () => console.log('Server On'));