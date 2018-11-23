const http = require('http');
const path = require('path');
const chokidar = require('chokidar');
const app = require('./server');

const server = http.createServer(app);

let currentApp = app;

const watcher = chokidar.watch('./server.js', {
  cwd: path.resolve(__dirname),
});

server.listen({ port: 4000 }, () => {
  console.log('🚀 Server ready');
});

watcher.on('ready', () => {
  console.log('watch ready');
});

watcher.on('change', (filePath) => {
  const modulePath = require.resolve(`./${filePath}`);

  if (require.cache[modulePath]) {
    delete require.cache[modulePath];
  }

  server.removeListener('request', currentApp);
  const newApp = require('./server'); // eslint-disable-line global-require
  server.on('request', newApp);
  currentApp = newApp;
});
