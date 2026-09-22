---
base: "[[Archive/import/Google Testing Blog/New database/New database.base]]"
Column 1: |-
  let everyRequestValid = true;
  for (const request of requests) {
    if (!isValid(request)) {
      everyRequestValid = false;
      break;
    }
  }

  if (everyRequestValid) {
    // do something
  }
Column 2: |-
  let everyUserEligible = true;
  for (const user of users) {
    if (!isEligible(user)) {
      everyUserEligible = false;
      break;
    }
  }

  if (everyUserEligible) {
    // do something
  }
---
