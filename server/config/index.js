const { resolve } = require('path');

exports.default = {
  port: 3760,
  jwt: {
    secret: 'co dobre to z itm',
    signOptions: { expiresIn: 604800 }
  },
  hashData: {
    algorithm: 'aes-256-cbc',
    cryptoKey: "KD^2lX03kg*%xcmgHA439AA120%#HCw2"
  },
  logs: {
    directory: resolve(__dirname, '..', 'logs'),
    filename: 'logfile.log',
    handleExceptions: true,
    json: false,
    maxsize: 5242880,
    maxFiles: 25,
    colorize: false
  },
  firebird: {
    user: 'SYSDBA',
    password: 'masterkey',
    interfaceUrl: 'http://localhost:9090'
  }
};
