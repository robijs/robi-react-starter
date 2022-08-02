const RestProxy = require('sp-rest-proxy');
const restProxy = new RestProxy({
  configPath: './config/private.json',
  port: 8081,
});

restProxy.serve();
