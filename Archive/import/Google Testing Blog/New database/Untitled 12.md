---
base: "[[Archive/import/Google Testing Blog/New database/New database.base]]"
Column 1: |-
  func (s *Serv) calculate(in int32) int {
    if val, ok := if s.cache[in] {
      return val  
    }
    val := s.calc(in)
    s.cache[in] = val
    return val
  }
Column 2: |-
  func (s *Serv) calculate(in int32) int {
                                  
                
     
    val := s.calc(in)
    s.cache[in] = val
    return val
  }
---
