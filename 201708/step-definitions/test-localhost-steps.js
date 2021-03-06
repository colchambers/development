module.exports = function () {

    this.Given(/^I am on the openmark localhost home page$/, function () {

        // load google
        return helpers.loadPage(page.testLocalhost.url);
    });
	
	this.Then(/^the page title should be "([^"]*)"$/, function(pageTitle) {
		var response = page.testLocalhost.titleContains(pageTitle)
		// console.log(respone);
	  return response;
	});

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

    this.Then(/^I click product item "([^"]*)"$/, function (productTitle) {

        // click an item in the search results via the google page object
        return page.testLocalhost.clickProductItem(productTitle);
    });

    this.Then(/^I should see product detail with title "([^"]*)"$/, function (pageTitle) {

        return page.testLocalhost.titleContains(pageTitle);
    });
};
