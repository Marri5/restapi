# System Traffic Flow

```mermaid
sequenceDiagram
    %% Define participant styles
    participant C as Client
    participant LB as Load Balancer
    participant API as API Server
    participant Auth as Auth Middleware
    participant Val as Validation
    participant DB as MongoDB
    
    %% Style participants with colors
    style C fill:#f96, stroke:#333, stroke-width:2px
    style LB fill:#6af, stroke:#333, stroke-width:2px
    style API fill:#9c6, stroke:#333, stroke-width:2px
    style Auth fill:#f9a, stroke:#333, stroke-width:2px
    style Val fill:#be9, stroke:#333, stroke-width:2px
    style DB fill:#c9f, stroke:#333, stroke-width:2px
    
    %% Request flow
    C->>+LB: HTTPS Request
    Note over C,LB: Secure connection with headers
    LB->>+API: Forward Request
    API->>+Auth: Validate Email Pattern
    
    %% Authentication decision
    alt Invalid Email
        Auth-->>-API: Reject Request
        Note right of Auth: Must be @afk.no domain
        API-->>-LB: 401 Unauthorized
        LB-->>-C: 401 Unauthorized
    else Valid Email
        Auth-->>-API: Continue
        API->>+Val: Validate Request Data
        
        %% Validation decision
        alt Invalid Data
            Val-->>-API: Validation Error
            Note right of Val: Schema/type validation failed
            API-->>LB: 400 Bad Request
            LB-->>C: 400 Bad Request
        else Valid Data
            Val-->>-API: Continue
            API->>+DB: Database Operation
            Note over API,DB: CRUD operation
            DB-->>-API: Operation Result
            API-->>-LB: 200/201 Success Response
            LB-->>-C: Success + Data
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