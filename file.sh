#!/bin/bash

# Variables
IMG_EXPRESS=jaimehuacac/img_express:v2
CONT_EXPRESS=app_express
CONT_SQLSERVER=db_sqlserver

# Execution
# docker build -t $IMG_EXPRESS .
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=YourPassword123' --name $CONT_SQLSERVER -d mcr.microsoft.com/mssql/server:2022-latest
docker run -d -p 3000:3000 --name app_express --link $CONT_SQLSERVER:$CONT_SQLSERVER $IMG_EXPRESS