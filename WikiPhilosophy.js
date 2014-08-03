/*
*	Getting to Philosophy
*	https://en.wikipedia.org/wiki/Wikipedia:Getting_to_Philosophy
*/

"use strict";

var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();
var counter = 0;

function strip(str) {
		var d = 0, k = 0;
		var c;
		var out = '';
		for (var i=0; i<str.length; i++) {
	        c = str[i];

			if (d < 1) {
				if (c === '>') {
					k -= 1;
				}

				if (c === '<') {
					k += 1;
				}
			}

			if (k < 1) {
				if (c === '(') {
					d +=1;
				}
				if (d > 0) {
					out += ' ';
				} else {
					out += c
				}

				if (c === ')') {
					d -= 1;
				}
			} else {
				out += c;
			}
		}

		return out.replace(/'/g, '').trim();
}

function clean(str) {
	var promise = webdriver.promise.defer();

	var para = browser.findElement(webdriver.By.css('#mw-content-text > p'));
	para.getInnerHtml().then(function(html){
		html = strip(html);
		var script = "document.querySelector('#mw-content-text > p').innerHTML = '" + html + "'";
		browser.executeScript(script).then(promise.fulfill);
	});
	return promise.promise;
}

function findLink() {
	browser.findElement(webdriver.By.css('#mw-content-text > p a[title]')).then(function(link) {
		link.getAttribute('title').then(function(text) {
			console.log(++counter + '. ' + text);
			if (text === 'Philosophy') {
				console.log('\nReached Philosophy in '+ counter +' hops.\n');
				browser.quit();
			} else {
				link.click().then(clean).then(findLink);
			}
		})
	})
}

browser.get('http://en.wikipedia.org/wiki/Special:Random').then(clean).then(findLink);
