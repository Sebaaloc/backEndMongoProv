## What is the project:

This is a simple CRUD for MongoDB using Node.js, express and ORM Mongoose it queries, inserts, updates and deletes records in two MongoDB collections called providers and specialties.

## How to run the project:

To run the project follow these steps:  
- Install node.  
- clone the project in your computer.  
- Open the project with your favorite IDE and run the command npm install.  
- Create a .env within the root folder of the project file and create the variables PORT and MONGO_ROUTE.  
- Use npm run start to execute the program.  
- Use npm run test to execute the tests.  

## API Documentation backEndMongoProv
1.0.0  
Base URL: http://localhost:3000/  
API for CRUD operations in MondoDB

**Providers**: queries, inserts, updates and deletes data of service providers for a company.  

**GET /providers**  
Returns data of all providers of services or a single provider if the user inputs query params.  
**Parameters**  
**name(string):** Optional name of provider to search.  
**mname(string):** Optional middle name of provider to search.  
**mail(string):** Optional mail of provider to search.  

**Responses:**  
- **Code 200**  
**Description:** Found provider(s).  
**Example value:**  
```json
[
    {
        "specialty": {
            "_id": "59b84f14cab3a5b9d262979d",
            "name": "Developer",
            "createdBy": 66674,
            "createdAt": "Wed Mar 08 2017 03:45:08 GMT-0500 (GMT-05:00)",
            "updatedBy": 44861,
            "updatedAt": "Mon Sep 11 2017 22:49:29 GMT-0500 (GMT-05:00)"
        },
        "firstName": "Jhon",
        "lastName": "Jaramillo",
        "middleName": "",
        "email": "jhonJ@gmail.com",
        "projectedStartDate": "Tue Mar 14 2017 15:14:05 GMT-0500 (GMT-05:00)",
        "employerId": "318",
        "providerType": "DO",
        "staffStatus": "ACTIVE",
        "assignedTo": 87001,
        "status": "DENIED",
        "createdBy": 21560,
        "createdAt": "Wed May 03 2017 22:19:51 GMT-0500 (GMT-05:00)",
        "updatedBy": 55303,
        "updatedAt": "Mon Sep 11 2017 20:36:48 GMT-0500 (GMT-05:00)"
    }
]
```
- **Code 404**  
**Description:** Didn't find providers.   
**Example value:**  
```json
{
    "message": "Err: Provider not found.",
    "internal_code": "NOT_FOUND"
}
```

**POST /providersInsert**  
Inserts data of service providers on MongoDB collection providers.  
**Parameters (body)**  
**firstName(string):** First name of the provider.  
**lastName(string):** Last name of the provider.  
**middleName(string):** Middle name of the provider.  
**email(string):** email of the provider.  
**projectedStartDate(string):** starting date of the provider in the project.  
**employerId(string):** Employer ID of the provider.  
**providerType(string):** Type of provider.  
**staffStatus(string):** Status of the provider.  
**assignedTo(number):** Who is the provider assigned to.  
**status(string):** Status of the provider.  
**createdBy(number):** Who created the record of the provider.  
**createdAt(string):** When was the record of the provider created.  
**updatedBy(number):** Who updated the record of the provider.  
**updatedAt(string):** When was the record of the provider updated.  
**specialty(object):** Specialty of the provider. 

**Responses:**  
- **Code 200**  
**Description:** Provider created.  
**Example value:**  
```json
{
    "message": "Provider created."
}
```
- **Code 400**  
**Description:** Missing arguments for provider.  
**value:**  
```json
{
    "message": "Err: Missing input parameters.",
    "internal_code": "BAD_REQUEST"
}
```
- **Code 400**  
**Description:** Could not insert provider.  
**value:**  
```json
{
    "message": "Err: Provider not created in MongoDB.",
    "internal_code": "BAD_REQUEST"
}
```

**PATCH /providersUpdate**  
Updates data of service providers on MongoDB collection providers.  
**Parameters (body)**  
**firstName(string):** First name of the provider (optional).  
**lastName(string):** Last name of the provider (optional).  
**middleName(string):** Middle name of the provider (optional).  
**email(string):** email of the provider.  
**projectedStartDate(string):** starting date of the provider in the project (optional).  
**employerId(string):** Employer ID of the provider (optional).  
**providerType(string):** Type of provider (optional).  
**staffStatus(string):** Status of the provider (optional).  
**assignedTo(number):** Who is the provider assigned to (optional).  
**status(string):** Status of the provider (optional).  
**createdBy(number):** Who created the record of the provider (optional).  
**createdAt(string):** When was the record of the provider created (optional).  
**updatedBy(number):** Who updated the record of the provider (optional).  
**updatedAt(string):** When was the record of the provider updated (optional).  
**specialty(object):** Specialty of the provider (optional).  
**Responses:**  
- **Code 200**  
**Description:** Provider updated.  
**Example value:**  
```json
{
    "message": "Provider updated."
}
```
- **Code 400**  
**Description:** Could not update provider missing email in input args.  
**value:**  
```json
{
    "message": "Err: Provider not updated in MongoDB check that email exists within data.",
    "internal_code": "BAD_REQUEST"
}
```
- **Code 404**  
**Description:** Could not update provider because didn't exist within collection.  
**value:**  
```json
{
    "message": "Err: Provider not found.",
    "internal_code": "NOT_FOUND"
}
```

**DELETE /providerToDelete/:mail**  
Deletes record of the provider that has the input mail.  
**Parameters (params)**  
**mail:** Email of the provider to delete.  
- **Code 200**  
**Description:** Provider deleted.  
**Example value:**  
```json
{
    "message": "Provider deleted."
}
```
- **Code 404**  
**Description:** Provider to delete not found.  
**value:**  
```json
{
    "message": "Err: Provider not found within database for deletion.",
    "internal_code": "NOT_FOUND"
}
```
- **Code 400**  
**Description:** Provider not deleted.  
**value:**  
```json
{
    "message": "Err: Provider not deleted in MongoDB.",
    "internal_code": "BAD_REQUEST"
}
```

**Specialties:** queries, inserts, updates and deletes data of the specialties of the providers for a company.  
**GET /specialties**  
Returns data of all specialties of providers or a single specialty if the user inputs query params.  
**Parameters**  
**name(string):** Optional name of specialty to search.  
**createdBy(number):** Optional ID of who created the specialty.  
**createdAt(string):** Optional date of when was the specialty created.  
**updatedBy(number):** Optional ID of who created the specialty.  
**updatedAt(string):** Optional date of when was the specialty updated.  
**Responses:**  
- **Code 200**  
**Description:** Found specialty(ies).  
**Example value:**  
```json
[
    {
        "name": "Developer",
        "createdBy": 66674,
        "createdAt": "Wed Mar 08 2017 03:45:08 GMT-0500 (GMT-05:00)",
        "updatedBy": 44861,
        "updatedAt": "Mon Sep 11 2017 22:49:29 GMT-0500 (GMT-05:00)"
    }
]
```
- **Code 404**  
**Description:** Didn't find specialties.  
**value:**  
```json
{
    "message": "Err: Specialty of provider not found.",
    "internal_code": "NOT_FOUND"
}
```

**POST /specialtiesInsert**  
Inserts data of specialties of providers on MongoDB collection specialties.  
**name(string): Name of the specialty.  
**createdBy(number):** ID of who created the specialty.  
**createdAt(string):** Date in which the specialty was created.  
**updatedBy(number):** ID of who updated the specialty.  
**updatedAt(string):** Date in which the specialty was updated.  
**Responses:**  
- **Code 200**  
**Description:** Specialty created.  
**Example value:**  
```json
{
    "message": "Specialty created."
}
```
- **Code 400**  
**Description:** Missing arguments for Specialty.  
**value:**  
```json
{
    "message": "Err: Missing input parameters.",
    "internal_code": "BAD_REQUEST"
}
```
- **Code 400**  
**Description:** Could not insert Specialty.  
**value:**  
```json
{
    "message": "Err: Specialty not created in MongoDB.",
    "internal_code": "BAD_REQUEST"
}
```

**PATCH /specialtiesUpdate**  
updates data of specialties of providers on MongoDB collection specialties.  
**name(string):** Name of the specialty.  
**createdBy(number):** ID of who created the specialty (optional).  
**createdAt(string):** Date in which the specialty was created (optional).  
**updatedBy(number):** ID of who updated the specialty (optional).  
**updatedAt(string):** Date in which the specialty was updated (optional).  
**Responses:**  
- **Code 200**  
**Description:** Specialty updated.  
**Example value:**  
```json
{
    "message": "Specialty updated."
}
```
- **Code 400**  
**Description:** Could not update provider missing name in input args.  
**value:**  
```json
{
    "message": "Err: Specialty not updated in MongoDB check that name exists within data.",
    "internal_code": "BAD_REQUEST"
}
```
- **Code 404**  
**Description:** Could not update provider because didn't exist within collection.  
**value:**  
```json
{
    "message": "Err: Specialty not found.",
    "internal_code": "NOT_FOUND"
}
```

**DELETE /specialtiesToDelete/:name**  
Deletes record of the specialty of providers that has the input name.  
**Parameters (params)**  
**name:** Name of the specialty.  
- **Code 200**  
**Description:** Specialty deleted.  
**Example value:**  
```json
{
    "message": "Specialty deleted."
}
```
- **Code 404**  
**Description:** Specialty to delete not found.  
**value:**  
```json
{
    "message": "Err: Specialty not found within database for deletion.",
    "internal_code": "NOT_FOUND"
}
```
- **Code 400**  
**Description:** Specialty not deleted.  
**value:**  
```json
{
    "message": "Err: Specialty not deleted in MongoDB.",
    "internal_code": "BAD_REQUEST"
}
```
