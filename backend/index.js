const http = require('http');
const config = require('./utils/config');
const app = require('./app');

const server = http.createServer(app);

server.listen(config.PORT, () => {
    console.log(`Server is running is port ${config.PORT}`);
});

