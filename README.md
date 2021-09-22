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


## API Endpoints
All the endpoints are preceeded by `/app`.

- ### Auth

|Verb|Route|Description|Auth.|Body Params|Returns|Notes|
|-|-|-|-|-|-|-|
|POST|**/auth/login** |Log in with email and password|-|**email**, **password**|token, name, email, id, role|-
##
<br>

- ### User

|Verb|Route|Description|Auth.|Body Params|Returns|Notes|
|-|-|-|-|-|-|-|
|GET|**/user** |Get a list of all Users|Admin|-|List with all Users|-
|GET|**/user/:userId** |Get an User by userId|Admin|-|User|-
|POST|**/user**|Register a new User in the App|Admin|**name**, **email**, **password**, **role**|User created|-|
|PUT|**/user/:userId**|Update an User by id|Admin|name, email, password, role|User updated|-|
|DELETE|**/user/:userId** |Delete an User by userId|Admin|-|User deleted|-

##
<br>

- ### Customer

|Verb|Route|Description|Auth.|Body Params|Returns|Notes|
|-|-|-|-|-|-|-|
|GET|**/user/customers** |Get a list with all customers|Admin, User|-|List with all customers|-
|GET|**/user/customers/:customerId** |Get a Customer by customerId|Admin, User|-|Customer|-
|POST|**/user/customers**|Register a new Customer in the App|Admin, User|**name**, **email**, **surname**, **photo**, **creator, **lastModified**|Customer created|-|
|PUT|**/user/customers/:customerId**|Update a Customer by id|Admin, User|name, email, surname, photo, creator, lastModified|Customer updated|-
|DELETE|**/user/customers/:customerId** |Delete a Customer by userId|Admin, User|-|Customer deleted|-

##

