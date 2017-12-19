@localhost
Feature: DB123 Tax credit calculator: Scenario 8
  I can calculate the tax credit allowances for the years between 2011 and 2018
  for scenario 8. Couples with 1 child over 1 year of age in childcare. Partner works 30 hours, child care
  cost is £273 fer week and household income is £25k.

  Background: Enter basic details
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

  Scenario: 2011-12
    Given I set element "#taxYear" value to "2011-12"
    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value  |
      | #resultSummary table tr:first-child td.right  |   0.00 |
      | #resultSummary table tr:nth-child(2) td.right |   0.00 |
      | #resultSummary table tr:nth-child(3) td.right | 545.00 |
      | #resultSummary table tr:nth-child(4) td.right | 545.00 |

  Scenario: 2012-13
    Given I set element "#taxYear" value to "2012-13"
    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value  |
      | #resultSummary table tr:first-child td.right  |   0.00 |
      | #resultSummary table tr:nth-child(2) td.right |   0.00 |
      | #resultSummary table tr:nth-child(3) td.right | 277.20 |
      | #resultSummary table tr:nth-child(4) td.right | 277.20 |

  Scenario: 2013-14
    Given I set element "#taxYear" value to "2013-14"
    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value  |
      | #resultSummary table tr:first-child td.right  |   0.00 |
      | #resultSummary table tr:nth-child(2) td.right |   0.00 |
      | #resultSummary table tr:nth-child(3) td.right | 327.20 |
      | #resultSummary table tr:nth-child(4) td.right | 327.20 |

  Scenario: 2014-15
    Given I set element "#taxYear" value to "2014-15"
    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value  |
      | #resultSummary table tr:first-child td.right  |   0.00 |
      | #resultSummary table tr:nth-child(2) td.right |   0.00 |
      | #resultSummary table tr:nth-child(3) td.right | 407.20 |
      | #resultSummary table tr:nth-child(4) td.right | 407.20 |

  Scenario: 2015-16
    Given I set element "#taxYear" value to "2015-16"
    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value  |
      | #resultSummary table tr:first-child td.right  |   0.00 |
      | #resultSummary table tr:nth-child(2) td.right |   0.00 |
      | #resultSummary table tr:nth-child(3) td.right | 487.20 |
      | #resultSummary table tr:nth-child(4) td.right | 487.20 |

  Scenario: 2016-17
    Given I set element "#taxYear" value to "2016-17"
    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value  |
      | #resultSummary table tr:first-child td.right  |   0.00 |
      | #resultSummary table tr:nth-child(2) td.right |   0.00 |
      | #resultSummary table tr:nth-child(3) td.right | 487.20 |
      | #resultSummary table tr:nth-child(4) td.right | 487.20 |

  Scenario: 2017-18
    Given I set element "#taxYear" value to "2017-18"
    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value  |
      | #resultSummary table tr:first-child td.right  |   0.00 |
      | #resultSummary table tr:nth-child(2) td.right |   0.00 |
      | #resultSummary table tr:nth-child(3) td.right | 487.20 |
      | #resultSummary table tr:nth-child(4) td.right | 487.20 |
