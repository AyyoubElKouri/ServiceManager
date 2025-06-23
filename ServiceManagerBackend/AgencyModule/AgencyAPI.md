# Agency Module API Documentation

## Overview

The Agency Module provides RESTful API endpoints for managing agencies within the Service Manager
system. All endpoints require admin-level authentication.

## Base URL

```
/api/agencies
```

## Authentication

All endpoints require admin-level authorization through the `AuthMiddleware.authorizeAdminOnly`
middleware.

## Endpoints

### 1. Get All Agencies

Retrieve a list of all agencies in the system.

-   **HTTP Method:** `GET`
-   **Endpoint:** `/`
-   **Authentication:** Admin only
-   **Request Parameters:** None
-   **Request Body:** None

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "address": "string",
      "phone": "string",
      "email": "string",
      "isActive": boolean,
      "isCurrent": boolean,
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
  ]
}
```

### 2. Create New Agency

Create a new agency in the system.

-   **HTTP Method:** `POST`
-   **Endpoint:** `/`
-   **Authentication:** Admin only
-   **Request Parameters:** None

**Request Body:**

```json
{
  "name": "string (required)",
  "address": "string (optional)",
  "phone": "string (optional)",
  "email": "string (optional)",
  "isActive": boolean (optional, default: true)
}
```

**Response:**

```json
{
  "success": true,
  "message": "Agency created successfully",
  "data": {
    "id": "string",
    "name": "string",
    "address": "string",
    "phone": "string",
    "email": "string",
    "isActive": boolean,
    "isCurrent": boolean,
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### 3. Get Agency by ID

Retrieve a specific agency by its ID.

-   **HTTP Method:** `GET`
-   **Endpoint:** `/:id`
-   **Authentication:** Admin only

**Request Parameters:**

-   `id` (string, required): The unique identifier of the agency

**Request Body:** None

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "address": "string",
    "phone": "string",
    "email": "string",
    "isActive": boolean,
    "isCurrent": boolean,
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

**Error Response (ID not provided):**

```json
{
    "error": "ID is required"
}
```

### 4. Update Agency

Update an existing agency's information.

-   **HTTP Method:** `PATCH`
-   **Endpoint:** `/:id`
-   **Authentication:** Admin only

**Request Parameters:**

-   `id` (string, required): The unique identifier of the agency

**Request Body:**

```json
{
  "name": "string (optional)",
  "address": "string (optional)",
  "phone": "string (optional)",
  "email": "string (optional)",
  "isActive": boolean (optional)
}
```

**Response:**

```json
{
  "success": true,
  "message": "Agency updated successfully",
  "data": {
    "id": "string",
    "name": "string",
    "address": "string",
    "phone": "string",
    "email": "string",
    "isActive": boolean,
    "isCurrent": boolean,
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### 5. Set Current Agency

Set a specific agency as the current active agency.

-   **HTTP Method:** `PATCH`
-   **Endpoint:** `/:id/set-current`
-   **Authentication:** Admin only

**Request Parameters:**

-   `id` (string, required): The unique identifier of the agency to set as current

**Request Body:** None

**Response:**

```json
{
  "success": true,
  "message": "Current agency updated successfully",
  "data": {
    "id": "string",
    "name": "string",
    "address": "string",
    "phone": "string",
    "email": "string",
    "isActive": boolean,
    "isCurrent": true,
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### 6. Delete Agency

Delete an agency from the system.

-   **HTTP Method:** `DELETE`
-   **Endpoint:** `/:id`
-   **Authentication:** Admin only

**Request Parameters:**

-   `id` (string, required): The unique identifier of the agency to delete

**Request Body:** None

**Response:**

```json
{
    "success": true,
    "message": "Agency deleted successfully"
}
```

## Error Responses

### Common Error Codes

-   `400 Bad Request`: Invalid request data or missing required fields
-   `401 Unauthorized`: Authentication required
-   `403 Forbidden`: Insufficient permissions (admin required)
-   `404 Not Found`: Agency not found
-   `500 Internal Server Error`: Server error

### Error Response Format

```json
{
    "success": false,
    "error": "Error message description",
    "code": "ERROR_CODE"
}
```

## Usage Examples

### Create Agency

```bash
curl -X POST http://localhost:3000/api/agencies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Main Office",
    "address": "123 Business Street",
    "phone": "+1234567890",
    "email": "main@company.com"
  }'
```

### Get All Agencies

```bash
curl -X GET http://localhost:3000/api/agencies \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### Update Agency

```bash
curl -X PATCH http://localhost:3000/api/agencies/AGENCY_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Updated Office Name",
    "phone": "+1987654321"
  }'
```

### Set Current Agency

```bash
curl -X PATCH http://localhost:3000/api/agencies/AGENCY_ID/set-current \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### Delete Agency

```bash
curl -X DELETE http://localhost:3000/api/agencies/AGENCY_ID \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

## Notes

-   All endpoints require admin-level authentication
-   The system supports only one current agency at a time
-   Deleting the current agency may require setting another agency as current first
-   All datetime fields are in ISO 8601 format
-   ID fields are typically UUIDs or database-generated unique identifiers

## Version

API Version: 1.0.0 Last Updated: December 2024
