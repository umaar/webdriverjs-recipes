/*
* How many /wiki links are on the /wiki page.
*/

"use strict";

var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();

driver.get('http://en.wikipedia.org/wiki/Wiki');
driver.findElements(webdriver.By.css('[href^="/wiki/"]')).then(function(links){
	console.log('Found', links.length, 'Wiki links.' )
	driver.quit();
});

