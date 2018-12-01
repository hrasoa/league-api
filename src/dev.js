/* eslint-disable no-console */
import http from 'http';
import path from 'path';
import chokidar from 'chokidar'; // eslint-disable-line import/no-extraneous-dependencies
import app from './app';

let currentApp = app;
const server = http.createServer(app);

server.listen({ port: 4000 }, () => {
  console.log('🚀  Server ready.');
});

const watcher = chokidar.watch('.', {
  ignored: path.basename(__filename),
  cwd: path.resolve(__dirname),
});

watcher.on('ready', () => {
  console.log('👀  Watch ready...');
});

watcher.on('change', filePath => {
  console.log('Updated modules:');
  const moduleId = require.resolve(`./${filePath}`);
  if (!require.cache[moduleId]) {
    return;
  }
  clearCache(moduleId);
  server.removeListener('request', currentApp);
  const newApp = require('./app'); // eslint-disable-line global-require
  server.on('request', newApp);
  currentApp = newApp;
  console.log('Update applied.');
});

function clearCache(moduleId) {
  const mod = { ...require.cache[moduleId] };
  if (mod.parent) {
    console.log('- ', moduleId);
    delete require.cache[moduleId];
    clearCache(mod.parent.id);
  }
}
