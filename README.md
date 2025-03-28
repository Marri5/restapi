# API Routes Documentation

## Base URL
```
http://10.12.3.44:3000/v1/data
```

## Authentication
All requests must include an email in the `X-User-Email` header that matches the configured pattern (default: @afk.no).

## Endpoints

### 1. Create Data Entry
```http
POST /data
```

#### Request Body
```json
{
  "date": "2024-03-18T10:00:00Z",  // Required: ISO 8601 date format
  "data": {                         // Required: Object containing the data
    "key1": "value1",
    "key2": "value2"
    // ... any valid JSON data
  }
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "date": "2024-03-18T10:00:00Z",
    "data": {
      "key1": "value1",
      "key2": "value2"
    },
    "createdBy": "user@afk.no",
    "createdAt": "2024-03-18T10:00:00Z"
  }
}
```

### 2. Get Data Entry
```http
GET /data/:id
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "date": "2024-03-18T10:00:00Z",
    "data": {
      "key1": "value1",
      "key2": "value2"
    },
    "createdBy": "user@afk.no",
    "createdAt": "2024-03-18T10:00:00Z",
    "updatedAt": "2024-03-18T10:00:00Z"
  }
}
```

### 3. Query Data
```http
GET /data?startDate=2024-03-01&endDate=2024-03-31&page=1&limit=10
```

#### Query Parameters
- `startDate` (optional): ISO 8601 date
- `endDate` (optional): ISO 8601 date
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)

#### Response
```json
{
  "success": true,
  "data": [{
    "id": "507f1f77bcf86cd799439011",
    "date": "2024-03-18T10:00:00Z",
    "data": {
      "key1": "value1",
      "key2": "value2"
    },
    "createdBy": "user@afk.no",
    "createdAt": "2024-03-18T10:00:00Z",
    "updatedAt": "2024-03-18T10:00:00Z"
  }],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 45,
    "totalPages": 5
  }
}
```

### 4. Update Data Entry
```http
PUT /data/:id
```

#### Request Body
```json
{
  "date": "2024-03-18T11:00:00Z",  // Optional
  "data": {                         // Required
    "key1": "updated value",
    "key2": "value2"
  }
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "date": "2024-03-18T11:00:00Z",
    "data": {
      "key1": "updated value",
      "key2": "value2"
    },
    "createdBy": "user@afk.no",
    "createdAt": "2024-03-18T10:00:00Z",
    "updatedAt": "2024-03-18T11:00:00Z"
  }
}
```

### 5. Delete Data Entry
```http
DELETE /data/:id
```

#### Response
```json
{
  "success": true,
  "message": "Data entry successfully deleted"
}
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {} // Optional additional error details
  }
}
```

### Common Error Codes
- `INVALID_EMAIL`: Email pattern doesn't match required format
- `INVALID_DATE`: Invalid date format
- `INVALID_DATA`: Invalid data structure
- `NOT_FOUND`: Requested resource not found
- `UNAUTHORIZED`: Authentication failed
- `INTERNAL_ERROR`: Server error 