module.exports = mobile => {
    mobile.get('/empregos', (req, res) => {
        mobile.app.controllers.VacanciesCtrl.vacancies(mobile, req ,res);
    });

    mobile.get('/vaga', (req, res) => {
        mobile.app.controllers.VacanciesCtrl.vacancySingle(mobile, req ,res);
    })
}