# CRM-service

The objective of this API is to manage customer data for a shop.

## Build Setup

```bash
# install dependencies
$ npm install

# build with hot reload
$ npm run devStart

# build for production
$ npm run start
```

## API Endpoints
All the endpoints are preceeded by `/app`.

- ### Auth

|Verb|Route|Description|Auth.|Body Params|Returns|Notes|
|-|-|-|-|-|-|-|
|POST|**/auth/login** |Log in with email and password|-|**email**, **password**|token, email, id|-
##
<br>

- ### User

|Verb|Route|Description|Auth.|Body Params|Returns|Notes|
|-|-|-|-|-|-|-|
|GET|**/user** |Get a list of all Users|Admin|-|List with all Users|Pagination of 10 pages by default. It can be changed using query (limit and page)|
|GET|**/user/:userId** |Get an User by userId|Admin|-|User|-
|POST|**/user**|Register a new User in the App|Admin|**name**, **email**, **password**, **role**|User created|-|
|PUT|**/user/:userId**|Update an User by id|Admin|name, email, password, role|User updated|-|
|DELETE|**/user/:userId** |Delete an User by userId|Admin|-|User deleted|-

##
<br>

- ### Customer

|Verb|Route|Description|Auth.|Body Params|Returns|Notes|
|-|-|-|-|-|-|-|
|GET|**/customer** |Get a list with all customers|Admin, User|-|List with all Customers|Pagination of 10 pages by default. It can be changed using query (limit and page)|
|GET|**/customer/:customerId** |Get a Customer by customerId|Admin, User|-|Customer|-
|POST|**/customer**|Register a new Customer in the App|Admin, User|**name**, **email**, **surname**, **photo**, **creator**, **lastModified**|Customer created|-|
|PUT|**/customer/:customerId**|Update a Customer by id|Admin, User|name, email, surname, photo, creator, lastModified|Customer updated|-
|DELETE|**/customer/:customerId** |Delete a Customer by userId|Admin, User|-|Customer deleted|-

##

