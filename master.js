/**
 * Created by YOU on 2018/1/9.
 */
const https = require('https');
const cpuLength = require('os').cpus.length;
const childProcess = require('child_process');

let workers = [];
for (let i = 0; i < cpuLength; i++) {
  workers.push(childProcess.fork('./index.js', ['normal']))
}

