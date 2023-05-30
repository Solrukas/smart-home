// express settings
const express = require('express');
const app = express();
const path = require('path');
const telegram = require('./chat/bots');

const server_ip = "0.0.0.0";
const server_port = "2316";

// express json
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// express route
const router = require('./routes/router');
app.use('/', router);
  
// express error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500 error');
});

// express listen
app.listen(server_port, server_ip, () => {
    telegram.start();
    console.log(`Server running at http://${server_ip}:${server_port}/`);
});
