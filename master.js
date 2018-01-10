/**
 * Created by YOU on 2018/1/9.
 */
const https = require('https');
const cpuLength = require('os').cpus().length;
const childProcess = require('child_process');
const net = require('net');

let workers = [];

for (let i = 0; i < cpuLength; i++) {
  workers.push(childProcess.fork('./index.js', ['normal']))
}
net.createServer({
  pauseOnConnect: true,
}, (c) => {
  c.pause();
  let worker = workers.shift();
  worker.send('c', c);
  workers.push(worker)
}).listen(3002);