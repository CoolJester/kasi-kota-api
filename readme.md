# Kasi Kota 
Need to make an api with the following routes will fill the deeds later

## Status 
GET - `/api/healthCheck`
- Checks the health of the api, if it's running or not

GET - `/api/ping`
- checks the health as well but returns 'pong'

## Menu
GET - `/api/menu`
- Get Menu List
*will add some CRUD at a later stage*

## Order
GET - `/api/order/:orderId`
- Get order by order id

POST - `/api/order`
- place an order
- JSON Body {userId: id, items: [itemId, itemId]}
- Response  {orderId: orderId}

PUT - `/api/order/:orderId`
- Update an order, will replace with new information

DELETE - `/api/order/:orderId`
- Delete an order by orderId