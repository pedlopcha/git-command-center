/**
 * Git Command Center — server
 * Serves the static site in /public. No database, no build step.
 *
 * Run:      npm start          (or: node server.js)
 * Change port:  PORT=8081 npm start
 */
const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0'; // bind to all interfaces so other devices on the LAN can reach it

app.use(express.static(path.join(__dirname, 'public')));

// Anything not found under /public: a plain 404, not the homepage.
app.use((req, res) => {
  res.status(404).type('text/plain').send('404 - Not Found');
});

// function getLocalNetworkAddresses() {
//   const interfaces = os.networkInterfaces();
//   const addresses = [];
//   Object.keys(interfaces).forEach((name) => {
//     (interfaces[name] || []).forEach((iface) => {
//       if (iface.family === 'IPv4' && !iface.internal) {
//         addresses.push(iface.address);
//       }
//     });
//   });
//   return addresses;
// }

app.listen(PORT, HOST, () => {
  console.log('');
  console.log('  Git Command Center is running');
  console.log('  ------------------------------');
  console.log(`  On this machine:  http://localhost:${PORT}`);

  // const addresses = getLocalNetworkAddresses();
  // if (addresses.length) {
  //   addresses.forEach((addr) => console.log(`  On your network:  http://${addr}:${PORT}`));
  // } else {
  //   console.log('  No network interface detected - run `hostname -I` to find this machine\'s IP.');
  // }
  // console.log('');
  // console.log('  Press Ctrl+C to stop.');
  // console.log('');
});
