module.exports = app => {
    app.get('/', (req, res) => {
        app.controllers.HomeCtrl.home(app, req, res);
    });

    app.get('/empregos', (req, res) => {
        app.controllers.VacanciesCtrl.vacancies(app, req ,res);
    });

    app.get('/vaga/:url', (req, res) => {
        app.controllers.VacanciesCtrl.vacancySingle(app, req ,res);
    })

    app.get('/contato', (req, res) => {
        app.controllers.ContactCtrl.contact(app, req, res);
    });
}
