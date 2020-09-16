```mermaid
erDiagram

Pages     }o--|| Users    : Has  
Responses }o--|| Pages    : Has 
Questions }o--|| Pages    : Has 
Responses }o--|| Answers  : Contains
Answers   }o--|| Questions: Has 

```

