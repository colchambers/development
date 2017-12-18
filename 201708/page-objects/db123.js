module.exports = {

    defaultLocation: 'local',
    urls: {
        local: 'http://localhost:8887/DB123/development/content/',
        live: 'http://students.open.ac.uk/social-science/db123/'
    },

    pages: {
        "tax credit calculator": 'financial_tools/tool02.html'
    },

    getURL: function(location) {
        location = location?location: this.defaultLocation;
        return this.urls[location];
    },

    clickNavigationItem: function(containingText) {

        return helpers.clickHiddenElement(page.testLocalhost.elements.menuItem, containingText);
    },

    clickProductItem: function(containingText) {

        return helpers.clickHiddenElement(page.testLocalhost.elements.productItem, containingText);
    },

    titleContains: function(expectedTitle) {
        return driver.getTitle().then(function(pageTitle) {
            return expect(pageTitle).to.contain(expectedTitle);
        });;
    },

    questionTitleContains: function(expectedTitle) {
        return driver.getTitle().then(function(pageTitle) {
            return expect(pageTitle).to.contain(expectedTitle);
        });;
    },

};