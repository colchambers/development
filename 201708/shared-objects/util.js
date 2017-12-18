module.exports = {
    username: "import-test-user",
    password: "import-test-pa**word",
    setElementValueTo: function(selector, value) {
        return driver.findElement(by.css(selector)).then(function(el) {
            el.sendKeys(value);
            return el.sendKeys(selenium.Key.ENTER);
        });
    },

    elementShouldBe: function(selector, attribute, value) {
        return helpers.getAttributeValue(selector, attribute).then(function(actualValue){
            return expect(actualValue).to.equal(value);
        });
    },

    setCheckboxToSelected: function(selector) {
        return driver.findElement(by.css(selector)).then(function (el) {
            return el.click();
        });
    },

    setTextElementValueTo: function(selector, value) {
        return driver.findElement(by.css(selector)).then(function (el) {
            el.clear();
            el.sendKeys(value);
            return el.sendKeys(selenium.Key.ENTER);
        });
    },

    elementTextShouldBe: function(selector, value) {
        return driver.findElement(by.css(selector)).then(function (element) {
            return element.getText().then(function (actualValue) {
                return expect(actualValue).to.equal(value);
            });
        });
    }
};