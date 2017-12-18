module.exports = {

    url: 'http://localhost:8887/DB123/development/content/',

    pages: {
        "tax credit calculator": 'financial_tools/tool02.html'
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