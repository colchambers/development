module.exports = {

    url: 'https://students-acct.open.ac.uk/openmark/tt284.ayrf/', //http://localhost:8080/om/

    elements: {
        menuItem: 'nav[role="navigation"] ul li a',
        productItem: 'main .pitem a'
    },

    ids: {
        question: 'question'
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