function VacanciesDao(conn, config) {
    this._ObjectID = config.objectId;
    this._db = conn;
    this._collection = config.collection;
}

//SEARCH WITH PAGINATION
VacanciesDao.prototype.filter = function(parameters, callback){

  //SEARCH PARAMETERS
  let query = {};
  let page = 1;

  if(parameters.page && parameters.page > 0) page = parameters.page;

  if(parameters.vaga != '') {
    let text = parameters.vaga.normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim();
    query.titleForSearch = { $regex: '.*' + text + '.*', $options: 'i' };
  }

  if(parameters.cidade != 'todas') query.city = parameters.cidade;

  //PAGINATION PARAMETERS
  let options = {};
  page -= 1;
  options.limit = 10;
  options.skip = page == 0 ? page : ( page * options.limit );

  //RESULTS
  let vacancies = { query: parameters, count: 0, data: [], pagination: [] };

  return this._db.collection(this._collection)
                  .find( query, options )
                        .toArray((err, result) => {

    if(err) throw err;

    vacancies.data = result;

    this._db.collection(this._collection).find(query).count().then( value => {

      if(!parameters.page) this._db.collection('searches').insertOne({ date: new Date(), results: value, parameters });

      let diff = 4;
      let limit = options.limit;
      let size = Math.ceil(value / limit);
      let start = page;
      let med = page + diff;
      let end = page + diff * 2;
      page += 1;

      if(page <= 5){
        for(let i = 1; i <= 9 ; i++) vacancies.pagination.push({value: i , active: i == page ? true : false});
      }
      else if(page > 5 && (page + diff) <= size){
        start = page - diff;
        med = page;
        end = page + diff;

        for(let i = start; i <= end ; i++) vacancies.pagination.push({value: i , active: i == page ? true : false});
      }
      else{
        start = size - diff * 2;
        med = size - diff;
        end = size;

        for(let i = start; i <= end ; i++) vacancies.pagination.push({value: i , active: i == page ? true : false});
      }

      vacancies.count = value;
      vacancies.page = page;
      vacancies.sizePage = size;

      callback(vacancies);
    });

  });
}

VacanciesDao.prototype.getVacancy = function(parameter, callback){
    return this._db.collection(this._collection)
                        .findOne({
                                    url: {
                                            $eq: parameter
                                          }
                                 }, (err, result) => {

      if(err) throw err;
      callback(result);
    });
}

module.exports = function(){
    return VacanciesDao;
}
