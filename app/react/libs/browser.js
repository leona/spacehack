var UAParser    = require('ua-parser-js');

var browser = new UAParser().getBrowser();

console.log('Browser name:')
console.log(browser.name);
console.log('Browser version');
console.log(browser.major);

module.exports = browser;