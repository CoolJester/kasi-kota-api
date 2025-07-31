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

# Deployment Guide

## Login to Azure

```powershell
az login
```

##  Set Environment Variables
```
$RESOURCE_GROUP = "kasi-kota-dev"
$LOCATION = "southafricanorth"
$PLAN_NAME = "kasi-kota-app-plan"
$APP_NAME = "kasi-kota-dev"
$RUNTIME = "NODE|22-lts"
$ZIP_FILE = "deploy.zip"
```

## Create Resources
```
az group create --name $RESOURCE_GROUP --location $LOCATION
```

```
az appservice plan create --name $PLAN_NAME --resource-group $RESOURCE_GROUP --location $LOCATION --sku F1 --is-linux
```

*This command fails on powershell - because of the |*
```
az webapp create --resource-group $RESOURCE_GROUP --plan $PLAN_NAME --name $APP_NAME --runtime $RUNTIME
```

## Prepare for deployment
```
if (Test-Path $ZIP_FILE) {
    Remove-Item -Path $ZIP_FILE -Force
}
```

```
Compress-Archive -Path * -DestinationPath deploy.zip -Force
```

```
az webapp deploy source config-zip --resource-group $RESOURCE_GROUP --name $APP_NAME --src $ZIP_FILE
```

## Configure web app
```
az webapp config appsettings set --resource-group $RESOURCE_GROUP --name $APP_NAME --settings `
    ENV=production `
    DB_URI="your-mongodb-or-other-connection-string"
```

## Clean Resources 
```
az group delete --name $RESOURCE_GROUP --no-wait --yes
```

### Debug
```
az webapp log tail --name $APP_NAME --resource-group $RESOURCE_GROUP
```
