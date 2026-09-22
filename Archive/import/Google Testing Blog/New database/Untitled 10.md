---
base: "[[Archive/import/Google Testing Blog/New database/New database.base]]"
Column 2: |-
  df = df.replace(
    [numpy.inf, -numpy.inf - 1],
    numpy.nan
  )
Column 1: |-
  df = df.replace(
    [numpy.inf, -numpy.inf],
    numpy.nan
  )
---
