@localhost
Feature: DB123 Tax credit calculator: Scenario 8
  I can calculate the tax credit allowances for the years between 2011 and 2018
  for scenario 8. Couples with 1 child over 1 year of age in childcare. Partner works 30 hours, child care
  cost is £273 fer week and household income is £25k.

  Background: Enter basic details
    Given I navigate to page "Tax credit calculator"

  Scenario: Scenario 2
    Given I set element "#status" value to "couple"
    Then element "#status" "value" should be "couple"
    Then I set element "#children" value to "4"
    Then element "#children" "value" should be "4"
    And I set checkbox "#hasBaby" to selected
    Then element "#hasBaby" "selected" should be "true"
    And I set element "#hours" value to "30 or more"
    And I set element "#hoursPartner" value to "Between 16 and 29"
    Then "#hoursPartner" selected option should be "Between 16 and 29"
    And I set element "#regCB" value to "4"
    And I set text element "#childcareCosts" value to "400"
    Then element "#childcareCosts" "value" should be "400"

    And I set text element "#income" value to "28000"
    Given I set element "#taxYear" value to "2015-16"
    And I click element ".result_table tr:last-child td.right a" with text "Calculate"

    Then the element "#resultSummary table tr:first-child td.right" text should be "0.00"
    And the element "#resultSummary table tr:nth-child(2) td.right" text should be "6852.20"
    And the element "#resultSummary table tr:nth-child(3) td.right" text should be "11665.00"
    And the element "#resultSummary table tr:nth-child(4) td.right" text should be "18517.20"
