const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;

let userConn = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    collection: process.env.DB_NAME
}

// Connection URL
const url = 'mongodb://'+ userConn.user +':'+ userConn.password +'@ds047440.mlab.com:47440/company-jobs';
 
// Database Name
const dbName = 'company-jobs';

// Connectino with MLab
let connection = _ => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
            if(err) reject(err);
            console.log("Connected successfully to server");
           
            resolve(client);
        });
    })
}

module.exports = () => {
    return {
        connection: connection,
        collection: dbName,
        objectId: ObjectId
    }
}