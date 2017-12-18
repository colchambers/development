module.exports = function () {

    this.Given(/^I navigate to "([^\"]*)"$/, function (url) {
        return helpers.loadPage(url);
    });

    this.Given(/^I navigate to page "([^\"]*)"$/, function (name) {
        url = page.db123.getURL() + page.db123.pages[name.toLowerCase()];
        return helpers.loadPage(url);
    });

    this.Given(/^I am on the openmark localhost home page$/, function () {

        // load google
        return helpers.loadPage(page.testLocalhost.url);
    });
	
	this.Then(/^the page title should be "([^"]*)"$/, function(pageTitle) {
		var response = page.testLocalhost.titleContains(pageTitle)
		// console.log(respone);
	  return response;
	});

    this.Then(/^element "([^"]*)" "([^"]*)" should be "([^"]*)"$/, function (selector, attribute, value) {
        return helpers.getAttributeValue(selector, attribute).then(function(actualValue){
            return expect(actualValue).to.equal(value);
        });
    });

    this.Then(/^I set element "([^"]*)" value to "([^"]*)"$/, function (selector, value) {
        // get the element froms the page
        return driver.findElement(by.css(selector)).then(function(el) {
            el.sendKeys(value);
            return el.sendKeys(selenium.Key.ENTER);
        });
    });

    this.Then(/^I set text element "([^"]*)" value to "([^"]*)"$/, function (selector, value) {
        // get the element froms the page
        return driver.findElement(by.css(selector)).then(function(el) {
            el.clear();
            el.sendKeys(value);
            return el.sendKeys(selenium.Key.ENTER);
        });
    });

    this.Then(/^I set checkbox "([^"]*)" to selected$/, function (selector) {
        // get the element from the page
        return driver.findElement(by.css(selector)).then(function(el) {
            return el.click();
        });
    });

    this.Then(/^I click element "([^"]*)" with text "([^"]*)"$/, function (selector, text) {
        // get the element from the page
        return helpers.getFirstElementContainingText(selector, text).then(function(el) {
            return el.click();
        });
    });

    this.Then(/^"([^"]*)" selected option should be "([^"]*)"$/, function (selector, value) {
        // get the element from the page
        return driver.findElement(by.css(selector + " option:checked")).then(function(element){
            return element.getText().then(function (actualValue) {
                return expect(actualValue).to.equal(value);
            });
        });
    });

    // External methods for reference
    this.Then(/^the element "([^"]*)" text should be "([^"]*)"$/, function(selector, value) {
        return driver.findElement(by.css(selector)).then(function(element){
            return element.getText().then(function (actualValue) {
                return expect(actualValue).to.equal(value);
            });
        });
    });

    // External methods for reference
    this.Then(/^the question title should be "([^"]*)"$/, function(title) {

        var element = driver.findElement(by.css('#question'));
        // var response = page.testLocalhost.titleContains(title)
        console.log('question title should: ');
        console.log(element);
        return expect(driver.elementTextContains(title));
    });

    this.When(/^I click navigation item "([^"]*)"$/, function (linkTitle) {

        // click an item in the search results via the google page object
        return page.testLocalhost.clickNavigationItem(linkTitle);
    });
};
