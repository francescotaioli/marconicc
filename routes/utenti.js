
/**
 *  Utenti.js
 *  In questo file ci saranno tutte le api relative agli utenti della piattaforma
 *  5/5/2017
 */

const middleware = require('./middleware/middleware');
const query = require('./../query/query.js');
const async = require('async');
const endpoint = require('./endpoint/endpoint.js');

module.exports = function (app, passport) {

    /**
     * home page
     */
    app.get('/', function (req, res) {
        res.render('index.ejs', {
            pageTitle: "marconiCC"
        });
    });


    /**
     * login page
     */
    app.get(endpoint.utenti.login, function (req, res) {
        res.render('login.ejs', {message: req.flash('loginMessage'), pageTitle: " login "});
    });


    /**
     * login post request
     */
    //todo controllo che se questa scuola non ha studenti caricati si apre la pagina per caricarli
    app.post(endpoint.utenti.login, passport.authenticate('local-login', {
            successRedirect: endpoint.utenti.studenti,
            failureRedirect: endpoint.utenti.login,
            failureFlash: true
        }),
        function (req, res) {
            res.redirect(endpoint.utenti.home);
        });


    /**
     * registration page
     */
    app.get(endpoint.utenti.signup, function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', {message: req.flash('signupMessage'), pageTitle: "signup"});
    });

    app.get(endpoint.utenti.unauthorized, function (req, res) {
        res.render('403.ejs');
    });


    /**
     * registration post request
     */
    app.post(endpoint.utenti.signup, passport.authenticate('local-signup', {
        successRedirect: endpoint.utenti.studenti, // redirect to the secure profile section
        failureRedirect: endpoint.utenti.signup, // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get(endpoint.utenti.logout, function (req, res) {
        req.logout();
        res.redirect(endpoint.utenti.home);
    });
};



