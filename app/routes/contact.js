module.exports = mobile => {
    mobile.get('/contato', (req, res) => {
        mobile.app.controllers.ContactCtrl.contact(mobile, req, res);
    });
}