@localhost
Feature: DB123 Tax credit calculator: Scenario 8
  I can calculate the tax credit allowances for the years between 2011 and 2018
  for scenario 8. Couples with 1 child over 1 year of age in childcare. Partner works 30 hours, child care
  cost is £273 fer week and household income is £25k.

  Scenario: 2011-12 Enter basic details
    Given I navigate to "http://localhost:8887/DB123/development/content/financial_tools/tool02.html"
#    Then element "#status" "value" should be "single"
#    When I set element "#status" value to "couple"
#    Then element "#status" "value" should be "couple"
#    Then I set element "#children" value to "1"
#    And I set element "#hasBaby" value to "false"
#    And I set element "#hours" value to "0"
#    And I set element "#hoursPartner" value to "2"
#    And I set element "#regCB" value to "1"
#    And I set element "#childcareCosts" value to "273"
#    And I set element "#taxYear" value to "6"
#    And I set element "#income" value to "250000"

    Then element "#resultSummary table tr:nth-child(2) td.right" "value" should be "0.00"

