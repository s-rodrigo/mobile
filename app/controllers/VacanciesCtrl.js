module.exports.vacancies = function(mobile, req, res){

    let objectId = mobile.config.mongodb.ObjectId;
    let dbName = mobile.config.mongodb.collection;
    let parameters = req.query;

    mobile.config.mongodb.connection(parameters, function(result){

        res.render('vagas', result);
    });
}

module.exports.vacancySingle = function(mobile, req, res){
    res.render('vaga');
}
