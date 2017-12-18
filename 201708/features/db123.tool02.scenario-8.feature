@localhost
Feature: DB123 Tax credit calculator: Scenario 8
  I can calculate the tax credit allowances for the years between 2011 and 2018
  for scenario 8. Couples with 1 child over 1 year of age in childcare. Partner works 30 hours, child care
  cost is £273 fer week and household income is £25k.

  Background: Enter basic details
    Given I navigate to page "Tax credit calculator"
    Then element "#status" "value" should be "single"
    When I set element "#status" value to "couple"
    Then element "#status" "value" should be "couple"
    Then I set element "#children" value to "1"
    Then element "#children" "value" should be "1"
#    And I set checkbox "#hasBaby" to selected
#    Then element "#hasBaby" "selected" should be "true"
    And I set element "#hours" value to "Not working"
    And I set element "#hoursPartner" value to "30 or more"
    Then "#hoursPartner" selected option should be "30 or more"
    And I set element "#regCB" value to "1"
    And I set text element "#childcareCosts" value to "273"
    Then element "#childcareCosts" "value" should be "273"

    And I set text element "#income" value to "25000"

  Scenario: 2011-12
    Given I set element "#taxYear" value to "2011-12"
    And I click element ".result_table tr:last-child td.right a" with text "Calculate"

    Then the element "#resultSummary table tr:first-child td.right" text should be "0.00"
    And the element "#resultSummary table tr:nth-child(2) td.right" text should be "0.00"
    And the element "#resultSummary table tr:nth-child(3) td.right" text should be "545.00"
    And the element "#resultSummary table tr:nth-child(4) td.right" text should be "545.00"

  Scenario: 2012-13
    Given I set element "#taxYear" value to "2012-13"
    And I click element ".result_table tr:last-child td.right a" with text "Calculate"

    Then the element "#resultSummary table tr:first-child td.right" text should be "0.00"
    And the element "#resultSummary table tr:nth-child(2) td.right" text should be "0.00"
    And the element "#resultSummary table tr:nth-child(3) td.right" text should be "277.20"
    And the element "#resultSummary table tr:nth-child(4) td.right" text should be "277.20"

  Scenario: 2013-14
    Given I set element "#taxYear" value to "2013-14"
    And I click element ".result_table tr:last-child td.right a" with text "Calculate"

    Then the element "#resultSummary table tr:first-child td.right" text should be "0.00"
    And the element "#resultSummary table tr:nth-child(2) td.right" text should be "0.00"
    And the element "#resultSummary table tr:nth-child(3) td.right" text should be "327.20"
    And the element "#resultSummary table tr:nth-child(4) td.right" text should be "327.20"

  Scenario: 2014-15
    Given I set element "#taxYear" value to "2014-15"
    And I click element ".result_table tr:last-child td.right a" with text "Calculate"

    Then the element "#resultSummary table tr:first-child td.right" text should be "0.00"
    And the element "#resultSummary table tr:nth-child(2) td.right" text should be "0.00"
    And the element "#resultSummary table tr:nth-child(3) td.right" text should be "407.20"
    And the element "#resultSummary table tr:nth-child(4) td.right" text should be "407.20"

  Scenario: 2015-16
    Given I set element "#taxYear" value to "2015-16"
    And I click element ".result_table tr:last-child td.right a" with text "Calculate"

    Then the element "#resultSummary table tr:first-child td.right" text should be "0.00"
    And the element "#resultSummary table tr:nth-child(2) td.right" text should be "0.00"
    And the element "#resultSummary table tr:nth-child(3) td.right" text should be "487.20"
    And the element "#resultSummary table tr:nth-child(4) td.right" text should be "487.20"
