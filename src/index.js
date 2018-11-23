const http = require('http');
const path = require('path');
const app = require('./server');

const server = http.createServer(app);

let currentApp = app;

server.listen({ port: 4000 }, () => {
  console.log('🚀 Server ready');
});

if (process.env.ENV !== 'production') {
  const chokidar = require('chokidar'); // eslint-disable-line global-require

  const watcher = chokidar.watch('./server.js', {
    cwd: path.resolve(__dirname),
  });

  watcher.on('ready', () => {
    console.log('Watch ready');
  });

  watcher.on('change', () => {
    console.log('Reload');
    const modulePath = require.resolve('./server.js');
    if (!require.cache[modulePath]) {
      return;
    }
    delete require.cache[modulePath];
    server.removeListener('request', currentApp);
    const newApp = require('./server'); // eslint-disable-line global-require
    server.on('request', newApp);
    currentApp = newApp;
  });
}
