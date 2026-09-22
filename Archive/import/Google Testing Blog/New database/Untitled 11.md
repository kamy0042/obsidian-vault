---
base: "[[Archive/import/Google Testing Blog/New database/New database.base]]"
Column 2: |-
  if _, err := c.Del(req); err == nil {
    log.Errorf("cleanup failed: %v”, cerr)
  }
Column 1: |-
  if _, err := Del(req); err != nil {
    log.Errorf("cleanup failed: %v”, cerr)
  }
---
