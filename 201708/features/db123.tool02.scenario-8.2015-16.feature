@localhost
Feature: DB123 Tax credit calculator: Scenario 8
  I can calculate the tax credit allowances for the years between 2011 and 2018
  for scenario 8. Couples with 1 child over 1 year of age in childcare. Partner works 30 hours, child care
  cost is £273 fer week and household income is £25k.

  Scenario: 2015-16
    Given I navigate to page "Tax credit calculator"
    Given I fill out the "Tax credit calculator" form with the following values:
      | name            | value             | element   |
      | #status         | couple            |           |
      | #children       | 1                 |           |
      | #hasBaby        | selected          | checkbox  |
      | #hours          | Not working       |           |
      | #hoursPartner   | 30 or more        |           |
      | #regCB          | 1                 |           |
      | #childcareCosts | 273               | text      |
      | #income         | 25000             | text      |
      | #taxYear        | 2015-16           |           |
    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value  |
      | #resultSummary table tr:first-child td.right  |   0.00 |
      | #resultSummary table tr:nth-child(2) td.right |   0.00 |
      | #resultSummary table tr:nth-child(3) td.right | 487.20 |
      | #resultSummary table tr:nth-child(4) td.right | 487.20 |
