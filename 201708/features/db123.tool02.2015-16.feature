@localhost
Feature: DB123 Tax credit calculator: Scenario 8
  I can calculate the tax credit allowances for the years between 2011 and 2018
  for scenario 8. Couples with 1 child over 1 year of age in childcare. Partner works 30 hours, child care
  cost is £273 fer week and household income is £25k.

  Background: Enter basic details
    Given I navigate to page "Tax credit calculator"
      And I set element "#taxYear" value to "2015-16"

  Scenario: Scenario 2: Check for consistency between years.
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

    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value    |
      | #resultSummary table tr:first-child td.right  | 0.00     |
      | #resultSummary table tr:nth-child(2) td.right | 6852.20  |
      | #resultSummary table tr:nth-child(3) td.right | 11665.00 |
      | #resultSummary table tr:nth-child(4) td.right | 18517.20 |

  Scenario: Scenario 3: Baseline for subsequent checks
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

    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value   |
      | #resultSummary table tr:first-child td.right  | 0.00    |
      | #resultSummary table tr:nth-child(2) td.right | 2302.20 |
      | #resultSummary table tr:nth-child(3) td.right | 6105.00 |
      | #resultSummary table tr:nth-child(4) td.right | 8407.20 |

  Scenario: Scenario 4: Working tax credit ex childcare
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

    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value    |
      | #resultSummary table tr:first-child td.right  | 3312.20  |
      | #resultSummary table tr:nth-child(2) td.right | 6370.00  |
      | #resultSummary table tr:nth-child(3) td.right | 6105.00  |
      | #resultSummary table tr:nth-child(4) td.right | 15787.20 |

  Scenario: Scenario 5: 30-hour element
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

    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value   |
      | #resultSummary table tr:first-child td.right  | 2502.20 |
      | #resultSummary table tr:nth-child(2) td.right | 0.00    |
      | #resultSummary table tr:nth-child(3) td.right | 6105.00 |
      | #resultSummary table tr:nth-child(4) td.right | 8607.20 |

  Scenario: Scenario 6: Childcare if single
    Given I fill out the "Tax credit calculator" form with the following values:
      | name            | value             | element   |
      | #status         | single            |           |
      | #children       | 2                 |           |
      | #hasBaby        | selected          | checkbox  |
      | #hours          | Between 16 and 29 |           |
      | #regCB          | 1                 |           |
      | #childcareCosts | 200               | text      |
      | #income         | 10000             | text      |

    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value    |
      | #resultSummary table tr:first-child td.right  | 2502.20  |
      | #resultSummary table tr:nth-child(2) td.right | 6370.00  |
      | #resultSummary table tr:nth-child(3) td.right | 6105.00  |
      | #resultSummary table tr:nth-child(4) td.right | 14977.20 |

  Scenario: Scenario 7: Working tax credit if no children
    Given I fill out the "Tax credit calculator" form with the following values:
      | name            | value             | element   |
      | #status         | single            |           |
      | #children       | none              |           |
      | #hours          | 30 or more        |           |
      | #income         | 10000             | text      |

    When I click element ".result_table tr:last-child td.right a" with text "Calculate"
    Then the "Tax credit calculator" form should contain the following values:
      | name                                          | value   |
      | #resultSummary table tr:first-child td.right  | 1302.20 |
      | #resultSummary table tr:nth-child(2) td.right |    0.00 |
      | #resultSummary table tr:nth-child(3) td.right |    0.00 |
      | #resultSummary table tr:nth-child(4) td.right | 1302.20 |