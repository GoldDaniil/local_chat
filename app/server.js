const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const PORT = 3002;

app.use(express.static(path.join(__dirname)));//раздача статических файлов

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.clientId = `client-${Math.random().toString(36).substr(2, 9)}`;//уникальный идент = клиент
  console.log(`Client connected with ID: ${ws.clientId}`);

  ws.on('message', (message) => {
    console.log(`Received from ${ws.clientId}: ${message}`);

    wss.clients.forEach((client) => {//всем кроме отправителя
      if (client.readyState === WebSocket.OPEN && client !== ws) {
        client.send(message);//не отправитель
      }
    });
  });

  ws.on('close', () => console.log(`Client ${ws.clientId} disconnected`));
});
