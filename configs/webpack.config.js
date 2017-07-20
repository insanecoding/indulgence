const path = require('path');

// import ts-node to transpile webpack.config.ts
require("ts-node").register({
  project: path.join(__dirname, 'tsconfig-for-ts-node.json')
})
// import dotenv to externalize settings to .env file
const dotenv = require ('dotenv').config();

module.exports = require("./webpack.config.ts")
