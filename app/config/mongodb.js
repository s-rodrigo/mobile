const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;

// Connection URL
const uri = 'mongodb://'+ process.env.DB_USER +':'+ process.env.DB_PASS +'@ds047440.mlab.com:47440/company-jobs';

// Connectino with MLab
let connection = () => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client){
        if(err) reject(err);

        console.log("Connected successfully to server");
        resolve(client);
      });

    });
}

module.exports = function(){
    return {
      connection: connection,
      etc: { dbName: process.env.DB_NAME, objectId: ObjectId, collection: process.env.DB_COLLECTION }
    }
}
