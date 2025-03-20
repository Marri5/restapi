# System Traffic Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant LB as Load Balancer
    participant API as API Server
    participant Auth as Auth Middleware
    participant Val as Validation
    participant DB as MongoDB

    C->>LB: HTTPS Request
    LB->>API: Forward Request
    API->>Auth: Validate Email Pattern
    
    alt Invalid Email
        Auth-->>API: Reject Request
        API-->>C: 401 Unauthorized
    else Valid Email
        Auth-->>API: Continue
        API->>Val: Validate Request Data
        
        alt Invalid Data
            Val-->>API: Validation Error
            API-->>C: 400 Bad Request
        else Valid Data
            Val-->>API: Continue
            API->>DB: Database Operation
            DB-->>API: Operation Result
            API-->>C: 200/201 Success Response
        end
    end
```

## Traffic Flow Description

1. **Client Request (HTTPS)**
   - All requests must be over HTTPS
   - Contains authentication headers and payload
   - Includes API version information

2. **Load Balancer Processing**
   - SSL termination
   - Request distribution
   - Basic security checks
   - Rate limiting enforcement

3. **API Server Processing**
   - Request parsing
   - Route handling
   - Business logic execution
   - Response formatting

4. **Authentication & Authorization**
   - Email pattern validation (@afk.no)
   - Request authentication
   - Permission verification

5. **Data Validation**
   - Schema validation
   - Data type checking
   - Required fields verification
   - Date format validation

6. **Database Operations**
   - CRUD operations
   - Data consistency checks
   - Transaction management

7. **Response Handling**
   - Status code selection
   - Response formatting
   - Error handling
   - Success confirmation 