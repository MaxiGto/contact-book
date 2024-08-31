# Contact book API

![API_IMG](https://kozub.com.ar/wp-content/uploads/2021/01/What-is-an-API.png)

## How to run project

1. Clone project
2. Create file ```.env```
3. Complete .env file following .env.example variables.
4. Create Docker image using the following command 
```
docker compose up --build
```
5. If you have already created the image, you can run the project with 
```
docker compose up -d
```

# API Documentation

## Contacts

### Create
Creates a new contact
```http
  POST /api/v1/contacts
```

### Object `Contact`

| Key          | Type                | Required | Description                                   |
|--------------|---------------------|----------|-----------------------------------------------|
| `firstName`  | `string`            | Yes      | Contact's first name.                        |
| `lastName`   | `string`            | Yes      | Contact's last name.                         |
| `dateOfBirth`| `string` (`YYYY-MM-DD`) | Yes | Date of birth.                                |
| `email`      | `string`            | Yes      | Email address.                               |
| `phones`     | `array` of `objects`| Yes      | List of phone numbers (see below).            |
| `addresses`  | `array` of `objects`| Yes      | List of addresses (see below).                |

#### Object `Phone`

| Key          | Type      | Required | Description                                |
|--------------|-----------|----------|--------------------------------------------|
| `number`     | `string`  | Yes      | Phone number.                              |
| `phoneType`  | `object`  | Yes      | Type of phone (see details below).         |

#### Object `phoneType`

| Key          | Type      | Required | Description                           |
|--------------|-----------|----------|---------------------------------------|
| `typeName`   | `string`  | Yes      | Phone type (allowed: `LANDLINE`, `MOBILE`). |

#### Object `Address`

| Key          | Type      | Required | Description                              |
|--------------|-----------|----------|------------------------------------------|
| `locality`   | `string`  | Yes      | City or locality.                        |
| `street`     | `string`  | Yes      | Street name.                             |
| `number`     | `number`  | Yes      | Street number.                           |
| `notes`      | `string`  | No       | Additional notes.                        |

### Example request body

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1985-06-15",
  "email": "john.doe@example.com",
  "phones": [
    {
      "number": "123-456-7890",
      "phoneType": {
        "typeName": "MOBILE"
      }
    }
  ],
  "addresses": [
    {
      "locality": "New York",
      "street": "5th Avenue",
      "number": 101,
      "notes": "Apartment 12B"
    }
  ]
}
```

### Example response body
```http
201 CREATED
```
```json
{
  "id": 1,  
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1985-06-15",
  "email": "john.doe@example.com",
  "phones": [
    {
      "number": "123-456-7890",
      "phoneType": {
        "typeName": "MOBILE"
      }
    }
  ],
  "addresses": [
    {
      "locality": "New York",
      "street": "5th Avenue",
      "number": 101,
      "notes": "Apartment 12B"
    }
  ]
}
```

### Fetch
Fetch existing conctacs based on search filters
```http
  GET /api/v1/contacts
```

### Query Params

| Param         |
|---------------|
| `id`          |
| `firstName`   |
| `lastName`    |
| `dateOfBirth` |
| `email`       |
| `phoneNumber` |
| `phoneType`   |
| `locality`    |
| `street`      |
| `number`      |

All query parameters are optional and can be used to filter the search results.

```Note: if no query param is provided, the endpoint returns all contacts.```

### Example search
```http
  GET /api/v1/contacts?phoneType=MOBILE
```
Searchs all contacts with MOBILE phone type

### Example response body
```http
200 OK
```
```json
{
    "contacts": [
        {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "dateOfBirth": "1990-01-01",
            "email": "john.doe@example.com",
            "phones": [
                {
                    "number": "098-765-4321",
                    "phoneType": {
                        "typeName": "MOBILE"
                    }
                }
            ],
            "addresses": [
                {
                    "locality": "Buenos Aires",
                    "street": "Avenida Siempre Viva",
                    "number": 742,
                    "notes": "Door 3A"
                }
            ]
        },
        {
            "id": 6,
            "firstName": "James",
            "lastName": "Johnson",
            "dateOfBirth": "1992-04-22",
            "email": "james.johnson@example.com",
            "phones": [
                {
                    "number": "987-654-3210",
                    "phoneType": {
                        "typeName": "MOBILE"
                    }
                }
            ],
            "addresses": [
                {
                    "locality": "Los Angeles",
                    "street": "Sunset Boulevard",
                    "number": 455,
                    "notes": "House with blue door"
                }
            ]
        }
    ]
}
```
### Edit
Updates an existing contact
```http
  PATCH /api/v1/contacts/:id
```
`id`: Id of the contact you want to edit

### Object `Contact`

| Key          | Type                | Required | Description                                   |
|--------------|---------------------|----------|-----------------------------------------------|
| `firstName`  | `string`            | No      | Contact's first name.                        |
| `lastName`   | `string`            | No      | Contact's last name.                         |
| `dateOfBirth`| `string` (`YYYY-MM-DD`) | No | Date of birth.                                |
| `email`      | `string`            | No      | Email address.                               |
| `phones`     | `array` of `objects`| No      | List of phone numbers (see below).            |
| `addresses`  | `array` of `objects`| No      | List of addresses (see below).                |

#### Object `Phone`

| Key          | Type      | Required | Description                                |
|--------------|-----------|----------|--------------------------------------------|
| `number`     | `string`  | No      | Phone number.                              |
| `phoneType`  | `object`  | No      | Type of phone (see details below).         |

#### Object `phoneType`

| Key          | Type      | Required | Description                           |
|--------------|-----------|----------|---------------------------------------|
| `typeName`   | `string`  | No      | Phone type (allowed: `LANDLINE`, `MOBILE`). |

#### Object `Address`

| Key          | Type      | Required | Description                              |
|--------------|-----------|----------|------------------------------------------|
| `locality`   | `string`  | No      | City or locality.                        |
| `street`     | `string`  | No      | Street name.                             |
| `number`     | `number`  | No      | Street number.                           |
| `notes`      | `string`  | No       | Additional notes.                        |

### Example request body

```json
{
  "firstName": "Mike",
  "addresses": [
    {
      "locality": "New York",
      "street": "5th Avenue",
      "number": 101,
      "notes": "Apartment 12B"
    },
    {
      "locality": "Los Angeles",
      "street": "Sunset Boulevard",
      "number": 455,
      "notes": "House with blue door"
    }
  ]
}
```
### Example response body
```http
200 OK
```
```json
{
  "id": 1,  
  "firstName": "Mike",
  "lastName": "Doe",
  "dateOfBirth": "1985-06-15",
  "email": "john.doe@example.com",
  "phones": [
    {
      "number": "123-456-7890",
      "phoneType": {
        "typeName": "MOBILE"
      }
    }
  ],
  "addresses": [
    {
      "locality": "New York",
      "street": "5th Avenue",
      "number": 101,
      "notes": "Apartment 12B"
    },
    {
      "locality": "Los Angeles",
      "street": "Sunset Boulevard",
      "number": 455,
      "notes": "House with blue door"
    }
  ]
}
```

### Delete
Deletes a contact
```http
  DELETE /api/v1/contacts/:id
```
`id`: Id of the contact you want to remove
```http
200 OK
```

## Contact activities

### Create
Creates a new contact activity
```http
  POST /api/v1/activities
```

### Object `Activity`

| Key            | Type                 | Required | Description                                |
|----------------|----------------------|----------|--------------------------------------------|
| `personId`     | `number`             | Yes      | ID of the person associated with the activity. |
| `activityType` | `string`             | Yes      | Type of the activity (allowed: `meeting`, `call`, `email`). |
| `activityDate` | `string` (ISO 8601)  | Yes      | Date and time of the activity              |
| `description`  | `string`             | Yes      | Brief description of the activity.         |

### Example request body

```json
{
  "personId": 1,
  "activityType": "meeting",
  "activityDate": "2024-08-30T15:00:00Z",
  "description": "Meeting to establish deadlines"
}
```

### Example request response
```http
201 CREATED
```
```json
{
    "activityType": "meeting",
    "activityDate": "2024-08-30T15:00:00Z",
    "description": "Meeting to establish deadlines",
    "id": 4,
    "contact": {
        "firstName": "John",
        "lastName": "Doe",
        "dateOfBirth": "1990-01-01",
        "email": "john.doe@example.com"
    }
}
```

### Fetch
Fetch activity with contact information
```http
  GET /api/v1/activities/:id
```
`id`: id of the contact whose activities you want to obtain.

| Param           |
|-----------------|
| `type`          |

You can filter results by activity type (allowed: `call`, `meeting`, `email`).

### Example search
```http
  GET /api/v1/activities/1?type=meeting
```
Searchs all meeting activities of the contact with id 1.

### Example response body
```json
{
    "contact": {
        "firstName": "John",
        "lastName": "Doe",
        "dateOfBirth": "1990-01-01",
        "email": "john.doe@example.com"
    },
    "contactActivities": [
        {
            "id": 3,
            "activityType": "meeting",
            "activityDate": "2024-08-30T11:00:00Z",
            "description": "Meeting to discuss project milestones"
        },
        {
            "id": 4,
            "activityType": "meeting",
            "activityDate": "2024-08-30T15:00:00Z",
            "description": "Meeting to establish deadlines"
        }
    ]
}
```

### Testing
Execute the following command to run all tests
```
npm run test
```

### Stack used
* NodeJs
* Express
* Typescript
* SQLite