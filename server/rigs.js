var express = require('express');
var router = express.Router();

// GET miner data
router.get('/', function(req, res) {
    res.json(req.json);
});

module.exports = router;


// var router = express.Router();

// // GET miner data
// router.get('/rigs', function(req, res) {
//     res.json(req.json);
// });

// module.exports = router;



// var miners = [];
// miners.json = [];
// app.use(function(req, res, next) {
//   req.json = {
//       "title"       : config.title,
//       "animation"   : config.animation,
//       "header"      : config.header ? config.header : config.title,
//       "miners"      : miners.json,
//       "refresh"     : config.web_refresh,
//       "tolerance"   : config.tolerance,
//       "temperature" : config.temperature,
//       "hashrates"   : config.hashrates,
//       "updated"     : 'selam'
//   };
//   next();
// });
// // logger.info('config: ' + config.miners.length + ' rig(s) configured');

// config.miners.forEach(function(item, i, arr) {
//   // logger.trace(item.name + ': config[' + i + ']');

//   // settings
//   var m = miners[i] = {};
//   var c = config.miners[i];
//   var j = miners.json[i];

//   m.name = c.name;
//   m.host = c.host;
//   m.port = c.port;
//   m.password = c.password;
//   m.poll = (typeof c.poll !== 'undefined') ? c.poll : config.miner_poll;
//   m.timeout = (typeof c.timeout !== 'undefined') ? c.timeout : config.miner_timeout;

//   function hostname() {
//       return c.hostname ? c.hostname : (m.host + ':' + m.port);
//   }

//   // stats
//   m.reqCnt = 0;
//   m.rspCnt = 0;

//   // it was never seen and never found good yet
//   c.last_seen = null;
//   c.last_good = null;

//   // socket
//   m.socket = new net.Socket()

//   .on('connect', function() {
//       // logger.info(m.name + ': connected to ' + m.socket.remoteAddress + ':' + m.socket.remotePort);
//       var req = {
//     "id"      : 0,
//     "jsonrpc" : "2.0",
//     "method"  : "miner_getstat1"
//   };
//   if (m.password) {
//     req.psw = m.password;
//   }
//       ++m.reqCnt;
//       // logger.trace(m.name + ': req[' + m.reqCnt + ']: ' + req);
//       m.socket.write(JSON.stringify(req) + '\n');
//       m.socket.setTimeout(m.timeout);
//   })

//   .on('timeout', function() {
//       // logger.warn(m.name + ': response timeout');
//       m.socket.destroy();
//       miners.json[i] = {
//           "name"       : m.name,
//           "host"       : hostname(),
//           "uptime"     : "",
//           "eth"        : "",
//           "dcr"        : "",
//           "eth_hr"     : "",
//           "dcr_hr"     : "",
//           "temps"      : "",
//           "pools"      : "",
//           "ver"        : "",
//           "target_eth" : "",
//           "target_dcr" : "",
//           "comments"   : c.comments,
//           "offline"    : c.offline,
//           "warning"    : null,
//           "error"      : 'Error: no response',
//           "last_seen"  : c.last_seen ? c.last_seen : 'never'
//       };
//   })

//   .on('data', function(data) {
//       ++m.rspCnt;
//       // logger.trace(m.name + ': rsp[' + m.rspCnt + ']: ' + data.toString().trim());
//       // c.last_seen = moment().format("YYYY-MM-DD HH:mm:ss");
//       m.socket.setTimeout(0);
//       var d = JSON.parse(data);
//       miners.json[i] = {
//           "name"       : m.name,
//           "host"       : hostname(),
//           "uptime"     : 'test',
//           "eth"        : d.result[2],
//           "dcr"        : d.result[4],
//           "eth_hr"     : d.result[3],
//           "dcr_hr"     : d.result[5],
//           "temps"      : d.result[6],
//           "pools"      : d.result[7],
//           "ver"        : d.result[0],
//           "target_eth" : c.target_eth,
//           "target_dcr" : c.target_dcr,
//           "comments"   : c.comments,
//           "offline"    : c.offline,
//           "ti"         : c.ti ? c.ti : null,
//           "error"      : null
//       };
//       if (c.target_eth && config.tolerance) {
//           if (miners.json[i].eth.split(';')[0] / 1000 < c.target_eth * (1 - config.tolerance / 100)) {
//               miners.json[i].warning = 'Low hashrate';
//               miners.json[i].last_good = c.last_good ? c.last_good : 'never';
//           } else {
//               miners.json[i].warning = null;
//               c.last_good = 'test'
//           }
//       }
//   })

//   .on('close', function() {
//       // logger.info(m.name + ': connection closed');
//       setTimeout(poll, m.poll);
//   })

//   .on('error', function(e) {
//       // logger.error(m.name + ': socket error: ' + e.message);
//       miners.json[i] = {
//           "name"       : m.name,
//           "host"       : hostname(),
//           "uptime"     : "",
//           "eth"        : "",
//           "dcr"        : "",
//           "eth_hr"     : "",
//           "dcr_hr"     : "",
//           "temps"      : "",
//           "pools"      : "",
//           "ver"        : "",
//           "target_eth" : "",
//           "target_dcr" : "",
//           "comments"   : c.comments,
//           "offline"    : c.offline,
//           "warning"    : null,
//           "error"      : e.name + ': ' + e.message,
//           "last_seen"  : c.last_seen ? c.last_seen : 'never'
//       };
//   });

//   function poll() {
//       m.socket.connect(m.port, m.host);
//   };

//   if ((typeof c.offline === 'undefined') || !c.offline) {
//       poll();
//   } else {
//       miners.json[i] = {
//           "name"       : m.name,
//           "host"       : hostname(),
//           "uptime"     : "",
//           "eth"        : "",
//           "dcr"        : "",
//           "eth_hr"     : "",
//           "dcr_hr"     : "",
//           "temps"      : "",
//           "pools"      : "",
//           "ver"        : "",
//           "target_eth" : "",
//           "target_dcr" : "",
//           "comments"   : c.comments,
//           "offline"    : c.offline,
//           "error"      : null
//       };
//   }
// });


