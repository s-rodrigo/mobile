module.exports = mobile => {
    mobile.get('/empregos', (req, res) => {
        mobile.controllers.VacanciesCtrl.vacancies(mobile, req ,res);
    });

    mobile.get('/vaga', (req, res) => {
        mobile.controllers.VacanciesCtrl.vacancySingle(mobile, req ,res);
    })
}