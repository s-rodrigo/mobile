module.exports = mobile => {
    mobile.get('/', (req, res) => {
        mobile.controllers.HomeCtrl.home(mobile, req, res);
    });
}
