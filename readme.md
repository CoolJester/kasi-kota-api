# Kasi Kota 
Need to make an api with the following routes will fill the deeds later

## Status 
GET - `/v1/api/healthCheck`
- Checks the health of the api, if it's running or not

GET - `/v1/api/ping`
- checks the health as well but returns 'pong'

## Menu
GET - `/v1/api/menu`
- Get Menu List
*will add some CRUD at a later stage*

## User
GET - `/v1/api/userId`
- Get a random guid to use for user identification

## Order
GET - `/v1/api/order/:orderId`
- Get order by order id

GET - `/v1/api/order/user/:userId`
- Get order by user id

POST - `/v1/api/order`
- place an order
- JSON Body {userId: id, items: [itemId, itemId]}
- Response  {orderId: orderId}

PUT - `/v1/api/order/:orderId` | *TODO*
- Update an order, will replace with new information

DELETE - `/v1/api/order/:orderId`
- Delete an order by orderId