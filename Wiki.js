/*
* How many /wiki links are on the /wiki page.
*/

"use strict";

var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();

browser.get('http://en.wikipedia.org/wiki/Wiki');
browser.findElements(webdriver.By.css('[href^="/wiki/"]')).then(function(links){
	console.log('Found', links.length, 'Wiki links.' )
	browser.quit();
});

