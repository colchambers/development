
"use strict";

var webdriver = require("selenium-webdriver"),
SeleniumServer = require("selenium-webdriver/remote").SeleniumServer;

var cbtHub = "http://hub.crossbrowsertesting.com:80/wd/hub";
var caps = {
name: 'Selenium Test Example',
build: '1.0',
browser_api_name: 'IE11',
os_api_name: 'Win10',
screen_resolution: '1024x768',
record_video: 'True',
record_network: 'True',
browserName: 'internet explorer',
username: 'yourusername@yourcompany.com',
password: 'yourauthkey'
}

var driver = new webdriver.Builder()
.usingServer(cbtHub)
.withCapabilities(caps)
.build();

function checkTitle() {
driver.getTitle()
.then(function(title) {
console.log("The title is: " + title)
});
return webdriver.until.titleIs('Selenium Test Example Page');
}

function handleFailure(err) {
console.error('Something went wrong!\n', err.stack, '\n');
quitDriver();
}

function quitDriver() {
console.log("WebDriver is about to close.");
driver.close();
}

driver.get('http://crossbrowsertesting.github.io/selenium_example_page.html');

driver.wait(checkTitle, 1000)
.then(quitDriver, handleFailure);