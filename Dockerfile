FROM node:16-alpine

WORKDIR /app

COPY app /app

RUN npm install express ws

EXPOSE 3002

CMD ["node", "server.js"]
