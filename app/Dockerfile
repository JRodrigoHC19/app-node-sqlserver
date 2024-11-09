FROM node:18

WORKDIR /usr/src/app
COPY index.js server.js
COPY config.js .
RUN npm install mssql

EXPOSE 3000

CMD ["node", "server.js"]
