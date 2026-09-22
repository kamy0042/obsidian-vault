---
base: "[[Archive/import/Google Testing Blog/New database/New database.base]]"
Column 1: |-
  def checkout(cart):
    if not cart.items:
      throw Error("cart empty")
    return checkout_internal(cart)
Column 2: |-
  def checkout(cart):
    if cart.items:
      throw Error("cart empty")
    return checkout_internal(cart)
---
