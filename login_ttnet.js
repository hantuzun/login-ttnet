var casper = require('casper').create();

var filename = 'login_ttnet.js';
var timeoutSeconds = 30;
var loginUrl = 'https://giris.turktelekomwifi.com/ttnet?a=0';
var formSelector = 'form#kayaaportletMainForm';

var username = casper.cli.options['username'];
var password = casper.cli.options['password'];

console.log(new Date() + ': Running ' + filename + '...');

if ( !username || !password ) {
    console.log(new Date() + ': Usage: casperjs ' + filename + ' --username=<username> --password=<password>');
    casper.exit(1);
}

casper.start(loginUrl);

casper.waitForSelector(
    formSelector, 
    function() {
        console.log(new Date() + ': Logging in...');
        this.fill(formSelector, {
         'username': username,
         'password': password,
         'cbAcceptTerms': true
        }, true);
    },
    function() {
        console.log(new Date() + ': Cannot load the form, skipping login.');
    },
    timeoutSeconds * 1000
);

// Hack
casper.waitForSelector( formSelector, function(){}, function(){}, 0 );

casper.run(function () {
    console.log(new Date() + ': Successfully exiting ' + filename + '.');
    casper.exit(0);
});
