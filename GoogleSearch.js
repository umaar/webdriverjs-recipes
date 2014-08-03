/*
* Carry out a Google Search
*/

"use strict";

var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();

driver.manage().window().setSize(1280, 1000).then(function() {
	driver.get('https://www.google.com');
	driver.findElement(webdriver.By.css('[name=q]')).then(function(elem){
		driver.actions().mouseMove(elem).perform();
		driver.sleep(5000);
		driver.quit();
	});
});

