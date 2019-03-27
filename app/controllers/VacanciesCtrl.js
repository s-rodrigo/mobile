module.exports.vacancies = (app, req, res) => {

    // SEARCH PARAMETERS
    let parameters = req.query;
    let config = app.config.mongodb.etc;

    app.config.mongodb.connection()
                      .then( client => {

      let db = client.db(config.nameDb);
      let model = new app.models.VacanciesDao(db, config);

      model.filter(parameters, result => {

        result.data.forEach(item => {
          if(item.description.length <= 210) return item;
          else return (item.description = item.description.substring(0,210) + '...');
        });

        client.close();
        console.log('Close connection');
        res.render('vagas', result);
      });
    });


}

module.exports.vacancySingle = function(app, req, res){
    //URL PARAMETER
    let parameter = req.params.url;
    let config = app.config.mongodb.etc;

    app.config.mongodb.connection()
                      .then( client => {

      let db = client.db(config.nameDb);
      let model = new app.models.VacanciesDao(db, config);

      model.getVacancy(parameter, result => {

      client.close();
      console.log('Close connection');
      res.render('vaga', result);
    });
  });
}
