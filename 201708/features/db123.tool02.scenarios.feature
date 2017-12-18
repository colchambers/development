@localhost
Feature: DB123 Tax credit calculator: Scenario 8
  I can calculate the tax credit allowances for the years between 2011 and 2018
  for scenario 8. Couples with 1 child over 1 year of age in childcare. Partner works 30 hours, child care
  cost is £273 fer week and household income is £25k.

  Background: Enter basic details
    Given I navigate to page "Tax credit calculator"

  Scenario: Scenario 2
    Given I fill out the "Tax credit calculator" form with the following values:
    | name            | value             | element   |
    | #status         | couple            |           |
    | #children       | 4                 |           |
    | #hasBaby        | selected          | checkbox  |
    | #hours          | 30 or more        |           |
    | #hoursPartner   | Between 16 and 29 |           |
    | #regCB          | 4                 |           |
    | #childcareCosts | 400               | text      |
    | #income         | 28000             | text      |
    | #taxYear        | 2015-16           |           |

    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value    |
      | #resultSummary table tr:first-child td.right  | 0.00     |
      | #resultSummary table tr:nth-child(2) td.right | 6852.20  |
      | #resultSummary table tr:nth-child(3) td.right | 11665.00 |
      | #resultSummary table tr:nth-child(4) td.right | 18517.20 |

  Scenario: Scenario 3
    Given I fill out the "Tax credit calculator" form with the following values:
      | name            | value             | element   |
      | #status         | couple            |           |
      | #children       | 2                 |           |
      | #hasBaby        | selected          | checkbox  |
      | #hours          | 30 or more        |           |
      | #hoursPartner   | Between 16 and 29 |           |
      | #regCB          | 1                 |           |
      | #childcareCosts | 200               | text      |
      | #income         | 28000             | text      |
      | #taxYear        | 2015-16           |           |

    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value   |
      | #resultSummary table tr:first-child td.right  | 0.00    |
      | #resultSummary table tr:nth-child(2) td.right | 2302.20 |
      | #resultSummary table tr:nth-child(3) td.right | 6105.00 |
      | #resultSummary table tr:nth-child(4) td.right | 8407.20 |

  Scenario: Scenario 4
    Given I fill out the "Tax credit calculator" form with the following values:
      | name            | value             | element   |
      | #status         | couple            |           |
      | #children       | 2                 |           |
      | #hasBaby        | selected          | checkbox  |
      | #hours          | 30 or more        |           |
      | #hoursPartner   | Between 16 and 29 |           |
      | #regCB          | 1                 |           |
      | #childcareCosts | 200               | text      |
      | #income         | 10000             | text      |
      | #taxYear        | 2015-16           |           |

    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value    |
      | #resultSummary table tr:first-child td.right  | 3312.20  |
      | #resultSummary table tr:nth-child(2) td.right | 6370.00  |
      | #resultSummary table tr:nth-child(3) td.right | 6105.00  |
      | #resultSummary table tr:nth-child(4) td.right | 15787.20 |

  Scenario: Scenario 5
    Given I fill out the "Tax credit calculator" form with the following values:
      | name            | value             | element   |
      | #status         | couple            |           |
      | #children       | 2                 |           |
      | #hasBaby        | selected          | checkbox  |
      | #hours          | Between 16 and 29 |           |
      | #hoursPartner   | Not working       |           |
      | #regCB          | 1                 |           |
      | #childcareCosts | 200               | text      |
      | #income         | 10000             | text      |
      | #taxYear        | 2015-16           |           |

    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value   |
      | #resultSummary table tr:first-child td.right  | 2502.20 |
      | #resultSummary table tr:nth-child(2) td.right | 0.00    |
      | #resultSummary table tr:nth-child(3) td.right | 6105.00 |
      | #resultSummary table tr:nth-child(4) td.right | 8607.20 |

  Scenario: Scenario 6
    Given I fill out the "Tax credit calculator" form with the following values:
      | name            | value             | element   |
      | #status         | single            |           |
      | #children       | 2                 |           |
      | #hasBaby        | selected          | checkbox  |
      | #hours          | Between 16 and 29 |           |
      | #regCB          | 1                 |           |
      | #childcareCosts | 200               | text      |
      | #income         | 10000             | text      |
      | #taxYear        | 2015-16           |           |

    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value    |
      | #resultSummary table tr:first-child td.right  | 2502.20  |
      | #resultSummary table tr:nth-child(2) td.right | 6370.00  |
      | #resultSummary table tr:nth-child(3) td.right | 6105.00  |
      | #resultSummary table tr:nth-child(4) td.right | 14977.20 |