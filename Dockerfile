FROM node:14.17.0-alpine3.13

WORKDIR /app

COPY api ./api
COPY socket ./socket
COPY package*.json ./

RUN npm install



EXPOSE 8800
EXPOSE 4000

COPY start.sh .
CMD ["sh", "start.sh"]