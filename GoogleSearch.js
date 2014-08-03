/*
* Carry out a Google Search
*/

"use strict";

var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();

browser.get('https://www.google.com');
browser.findElement(webdriver.By.name('q')).sendKeys('tuts+ code');
browser.findElement(webdriver.By.name('btnG')).click();

function logTitle() {
	browser.getTitle().then(function(title) {
		console.log('Current Page Title: ' + title);
		browser.quit();
	});
}

function clickLink(link) {
	link.click();
	logTitle();
}

function handleFailure(err) {
	console.error(err)
}

function findTutsPlusLink() {
	return browser.findElements(webdriver.By.css('[href="http://code.tutsplus.com/"]')).then(function(result) {
		return result[0];
	});
}

browser.wait(findTutsPlusLink, 2000).then(clickLink, handleFailure);




