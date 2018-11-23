const http = require('http');
const path = require('path');
const chokidar = require('chokidar');
const app = require('./server');

const server = http.createServer(app);
const entry = './server.js';

let currentApp = app;

server.listen({ port: 4000 }, () => {
  console.log('🚀 Server ready');
});

if (process.env.ENV !== 'production') {
  const watcher = chokidar.watch(entry, {
    cwd: path.resolve(__dirname),
  });

  watcher.on('ready', () => {
    console.log('Watch ready');
  });

  watcher.on('change', () => {
    const modulePath = require.resolve(entry);

    if (require.cache[modulePath]) {
      delete require.cache[modulePath];
    }

    server.removeListener('request', currentApp);
    const newApp = require('./server'); // eslint-disable-line global-require
    server.on('request', newApp);
    currentApp = newApp;
  });
}
