module.exports = mobile => {
    mobile.get('/contato', (req, res) => {
        mobile.controllers.ContactCtrl.contact(mobile, req, res);
    });
}
