[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13301908&assignment_repo_type=AssignmentRepo)
# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

# Branded Things API Documentation

## Endpoints :

List of available endpoints:

1. `get /pub/products`
2. `get /pub/products/:id`

3. `post /login`
4. `post /add-user`

5. `post /products`
6. `get /products`
7. `get products/:id`
8. `put /product/:id`
9. `delete /product/:id`
10. `patch /products/:id/imgurl`

11. `post /categories`
12. `get /categories`
13. `put /categories/:id`

&nbsp;

## 1. GET /pub/products

Description:
- Get all products from database public

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imgUrl": "string",
    "categoriesId": "integer",
    "AuthorId": "integer"
  }
]
```

&nbsp;

## 2. GET /pub/products/:id

Description: 
- Get a specific products by its ID.

Request:

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imgUrl": "string",
    "categoriesId": "integer",
    "AuthorId": "integer"
  }
]
```
_Response (404 - Not Found)_

```json
{
  "message": "Product id ${req.params.id} not found"
}
```

&nbsp;

## 3. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is missing"
}
OR
{
  "message": "Password is missing"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 4. POST /add-user

Request:

- body:

```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "string",
    "phoneNumber": "string",
    "address": "string"
}
```

_Response (201 - Created)_

```json
{
    "username": "string",
    "email": "string",
    "phoneNumber": "integer",
    "address": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Email already exists"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Must be in email format"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Password at least 5 characters"
}
```

&nbsp;

## 5. POST /products
Description:
- Create products

Request:

- body:

```json
{
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imgUrl": "string",
    "categoriesId": "integer",
    "AuthorId": "integer"
}
```
_Response (201 - Created)_

```json
{
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imgUrl": "string",
    "categoriesId": "integer",
    "AuthorId": "integer"
}
```
_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Description is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "categoriesId is required"
}
OR
{
  "message": "authorId is required"
}
```

&nbsp;

## 6. GET /products

Description:
- Get all products from database

_Response (200 - OK)_

```json
[
  {
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imgUrl": "string",
    "categoriesId": "integer",
    "AuthorId": "integer"
  }
]
```

&nbsp;

## 7. GET /products/:id

Description: 
- Get a specific products by its ID public.

Request:

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imgUrl": "string",
    "categoriesId": "integer",
    "AuthorId": "integer"
  }
]
```
_Response (404 - Not Found)_

```json
{
  "message": "Product id ${req.params.id} not found"
}
```

&nbsp;


## 8. PUT /product/:id

Description:
- Update products by ID.

Request Body:

```json
[
  {
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imgUrl": "string",
    "categoriesId": "integer",
    "AuthorId": "integer"
 }
]
```

_Response (200 - OK)_

```json
{
  "message": "Success update product id ${req.params.id}"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Description is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "categoriesId is required"
}
OR
{
  "message": "authorId is required"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product id ${req.params.id} not found"
}
```
&nbsp;


## 9. DELETE /product/:id

Description: Delete products by ID.

_Response (200 - OK)_

```json
{
  "message": "Id ${req.params.id} success to delete"
}
```
_Response (404 - Not Found)_

```json
{
  "message": "Product id ${req.params.id} not found"
}
```
&nbsp;

## 10. patch /articles/:id
Description:
- patch imgurl by id

Request Body:

```json

{
  "imgUrl": "string", 
}
```

_Response (200 - OK)_

```json
{
    "message": "Image ${product.name} success to update"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Product ${req.params.id} not found"
}
```

_Response (403 - forbidden)_
```json
{
    "message": "Forbidden Error"
}
```

_Response (401 - InvalidToken)_
```json
{
    "message": "Invalid Token"
}
OR
{
    "message": "JsonWebTokenError"
}
```
&nbsp;

## 11. POST /categories
Description:
- Create categories

Request:

- body:

```json
{
    "name": "string",
}
```
_Response (201 - Created)_

```json
{
    "name": "string",
}
```
_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
```

&nbsp;

## 12. GET /categories

Description:
- Get all categories from database

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "name": "string",
  }
]
```

&nbsp;

## 13. PUT /categories/:id

Description:
- Update categories by ID.

Request Body:

```json
[
  {
    "name": "string",
 }
]
```

_Response (200 - OK)_

```json
{
  "message": "Success update category id ${req.params.id}"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Category id ${req.params.id} not found"
}
```
&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```