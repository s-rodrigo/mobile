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
let connection = (parameters, all, callback) => {
      MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
          if(err) throw err;
          console.log("Connected successfully to server");

          //Execução da query
          var mongo = client.db(dbName);
          var nameCollection = process.env.DB_NAME;
          
          if(all){
            //Parametros de pesquisa
            var query = {};
            var options = {};
            var page = 1;

            if(parameters.page) page = parameters.page;
            if(parameters.page <= 0) page = 1;
            if(parameters.vaga != '') query.title = {$regex: '.*'+parameters.vaga+'.*', $options: 'i'};
            if(parameters.cidade != 'todas') query.city = parameters.cidade;

            //Parametros de paginação
            page -= 1;
            options.limit = 10;
            options.skip = page == 0 ? page : ( page * options.limit );

            //Resultados
            var vacancies = { query: parameters, count: 0, data: [], pagination: [] };


            return mongo.collection(nameCollection).find( query, options).toArray((err, result) => {

              if(err) throw err;
              vacancies.data = result;
              let pagination = [];

              mongo.collection(nameCollection).find(query).count().then( value => {

                let diff = 4;
                let limit = options.limit;
                let size = Math.ceil(value / limit);
                let start = page;
                let med = page + diff;
                let end = page + diff * 2;
                page += 1;

                if(page <= 5){
                  for(let i = 1; i <= 9 ; i++) pagination.push({value: i , active: i == page ? true : false});
                }
                else if(page > 5 && (page + diff) <= size){
                  start = page - diff;
                  med = page;
                  end = page + diff;

                  for(let i = start; i <= end ; i++) pagination.push({value: i , active: i == page ? true : false});
                }
                else{
                  start = size - diff * 2;
                  med = size - diff;
                  end = size;

                  for(let i = start; i <= end ; i++) pagination.push({value: i , active: i == page ? true : false});
                }

                vacancies.count = value;
                vacancies.pagination = pagination;
                vacancies.page = page;
                vacancies.sizePage = size;

                // /console.log(pagination);
                callback(vacancies);
                client.close();
                console.log('Close connection');
              });
            });

          }

          if(!all){

            return mongo.collection(nameCollection).findOne({config: { url: parameters }}).toArray((err, result) => {

              if(err) throw err;
              callback(result);
            });
          }
      });
}

module.exports = () => {
    return {
        connection: connection
    }
}
