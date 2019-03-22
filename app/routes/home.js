module.exports = mobile => {
    mobile.get('/', (req, res) => {
        mobile.app.controllers.HomeCtrl.home(mobile, req, res);
    });
}