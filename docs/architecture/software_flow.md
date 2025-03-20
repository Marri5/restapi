# Software Flow Diagram

```mermaid
flowchart TD
    Start([Request Received]) --> MW1{Auth Middleware}
    
    MW1 -->|Invalid| R1[Return 401]
    MW1 -->|Valid| MW2{Validation Middleware}
    
    MW2 -->|Invalid| R2[Return 400]
    MW2 -->|Valid| RC[Route Controller]
    
    RC --> |Create| C[Create Operation]
    RC --> |Read| R[Read Operation]
    RC --> |Update| U[Update Operation]
    RC --> |Delete| D[Delete Operation]
    
    C --> V1{Validate Data}
    R --> V2{Validate Query}
    U --> V3{Validate Update}
    D --> V4{Validate Delete}
    
    V1 -->|Invalid| E1[Return Error]
    V2 -->|Invalid| E2[Return Error]
    V3 -->|Invalid| E3[Return Error]
    V4 -->|Invalid| E4[Return Error]
    
    V1 -->|Valid| DB1[Save to MongoDB]
    V2 -->|Valid| DB2[Query MongoDB]
    V3 -->|Valid| DB3[Update MongoDB]
    V4 -->|Valid| DB4[Delete from MongoDB]
    
    DB1 --> Res[Format Response]
    DB2 --> Res
    DB3 --> Res
    DB4 --> Res
    
    Res --> End([Send Response])
```

## Software Flow Description

### 1. Request Processing
- Request enters the system
- Basic parsing and validation
- Route matching

### 2. Authentication Layer
- Email pattern validation
- Authentication checks
- Request validation

### 3. Route Controllers
- Request handling based on HTTP method
- Parameter extraction
- Business logic coordination

### 4. Data Validation
- Input validation
- Schema validation
- Business rule validation

### 5. Database Operations
- MongoDB interactions
- CRUD operations
- Error handling

### 6. Response Formatting
- Status code selection
- Response structure creation
- Error message formatting

### 7. Response Sending
- Headers setting
- Response compression
- Final response dispatch

## Error Handling
- Validation errors (400)
- Authentication errors (401)
- Not found errors (404)
- Server errors (500)
- Custom error responses 