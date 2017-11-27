@localhost
Feature: Shop for localhost
  I can search for and buy localhost
  
  Scenario: View product detail
    Given I am on the openmark localhost home page
	Then the page title should be "Are you ready for TT284?"
 ##   Then the question title should be "Are you ready for TT284?"
    
    