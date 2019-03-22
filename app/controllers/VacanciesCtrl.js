module.exports.vacancies = function(mobile, req, res){

    let objectId = mobile.config.mongodb.ObjectId;
    let dbName = mobile.config.mongodb.collection;
    let parameters = req.query;

    mobile.config.mongodb.connection().then( client => {
        let dao = new mobile.app.models.VacanciesDao(client, dbName, objectId);

        dao.filter(parameters, function(result){
            let data = { query: parameters, result: result };
            
            res.render('vagas', data);
        });
    });
}

module.exports.vacancySingle = function(mobile, req, res){
    res.render('vaga');
}