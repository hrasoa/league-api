/* eslint-disable no-console */
const http = require('http');
const path = require('path');
const chokidar = require('chokidar'); // eslint-disable-line import/no-extraneous-dependencies
const app = require('./app');

let currentApp = app;
const server = http.createServer(app);

server.listen({ port: 4000 }, () => {
  console.log('🚀  Server ready');
});

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

function clearCache(moduleId) {
  const mod = { ...require.cache[moduleId] };
  if (mod.parent) {
    console.log('- Clear', moduleId);
    delete require.cache[moduleId];
    clearCache(mod.parent.id);
  }
}
