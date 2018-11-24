const http = require('http');
const path = require('path');
const app = require('./app');

const server = http.createServer(app);

server.listen({ port: 4000 }, () => {
  console.log('🚀  Server ready');
});

if (process.env.NODE_ENV !== 'production') {
  const chokidar = require('chokidar'); // eslint-disable-line global-require
  let currentApp = app;

  const watcher = chokidar.watch('./app.js', {
    cwd: path.resolve(__dirname),
  });

  watcher.on('ready', () => {
    console.log('👀  Watch ready');
  });

  watcher.on('change', (filePath) => {
    console.log('🔁  Reloading ', filePath);
    const modulePath = require.resolve(`./${filePath}`);
    if (!require.cache[modulePath]) {
      return;
    }
    delete require.cache[modulePath];
    server.removeListener('request', currentApp);
    const newApp = require('./app'); // eslint-disable-line global-require
    server.on('request', newApp);
    currentApp = newApp;
  });
}
