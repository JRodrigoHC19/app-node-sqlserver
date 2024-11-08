#!/bin/bash

# Variables
MY_NETWORK=my_network
IMG_EXPRESS=img_express
CONT_EXPRESS=app_express
CONT_SQLSERVER=db_sqlserver

# Execution
docker network create $MY_NETWORK
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=YourPassword123' -p 1433:1433 --name $CONT_SQLSERVER --network $MY_NETWORK -d mcr.microsoft.com/mssql/server:2022-latest
docker build -t $IMG_EXPRESS .
docker run -d -p 3000:3000 --name $CONT_EXPRESS --network $MY_NETWORK $IMG_EXPRESS