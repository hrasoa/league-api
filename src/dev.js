const http = require('http');
const path = require('path');
const app = require('./app');

const server = http.createServer(app);

server.listen({ port: 4000 }, () => {
  console.log('🚀  Server ready');
});

if (process.env.NODE_ENV !== 'production') {
  const chokidar = require('chokidar'); // eslint-disable-line global-require,import/no-extraneous-dependencies
  let currentApp = app;

  const watcher = chokidar.watch('.', {
    ignored: path.basename(__filename),
    cwd: path.resolve(__dirname),
  });

  watcher.on('ready', () => {
    console.log('- Watch ready');
  });

  watcher.on('change', (filePath) => {
    console.log('- Changed ', filePath);
    const moduleId = require.resolve(`./${filePath}`);
    if (!require.cache[moduleId]) {
      return;
    }
    clearCache(moduleId);
    server.removeListener('request', currentApp);
    const newApp = require('./app'); // eslint-disable-line global-require
    server.on('request', newApp);
    currentApp = newApp;
  });
}

function clearCache(moduleId) {
  const mod = { ...require.cache[moduleId] };
  console.log('- Clear', moduleId);
  delete require.cache[moduleId];
  if (mod.parent && mod.parent.id !== '.') {
    clearCache(mod.parent.id);
  }
}
