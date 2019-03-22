function VacanciesDao(client, db, objectId){
    this._client = client;
    this._ObjectID = objectId;
    this._db = db;
}

VacanciesDao.prototype.filter = function(parameters, callback){
    var query = {};
    var options = {};
    var page = 1;
    
    if(parameters.page) page = parameters.page;
    if(parameters.vaga != '') query.title = {$regex: '.*'+parameters.vaga+'.*', $options: 'i'};
    if(parameters.cidade != 'todas') query.city = parameters.cidade;
    console.log(query);
    page -= 1;
    options.limit = 10;
    options.skip = page == 0 ? page : ( page * options.limit);

    var mongo = this._client.db(this._db);
    var nameCollection = process.env.DB_NAME;
    
    return mongo.collection(nameCollection)
        .find( query, options, { $inc: {views: 1} })
        .toArray((err, result) => {
                
            if(err) throw(err);
            callback(result);
    });
}

module.exports = function(){
    return VacanciesDao;
}