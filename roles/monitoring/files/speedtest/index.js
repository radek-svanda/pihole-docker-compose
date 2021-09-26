const http = require("http");
var exec = require("child_process").exec;

const port = 9112
const endpoint = '/metrics'

function log(what) {
  console.log(`${new Date().toString()} ${what}`)
}

function execute(command, callback) {
  exec(command, function (error, stdout, stderr) {
    callback(stdout);
  });
}

const requestListener = function (req, res) {
  if (req.url === endpoint) {
    log("Starting speedtest...");
    execute("/usr/bin/speedtest-cli --json", (json) => {
      log("Speedtest done.");
      log(json);
      const test = JSON.parse(json);
      res.setHeader("Content-Type", "text/plain; charset=UTF-8");
      res.writeHead(200);
      res.end(
        `
# HELP speedtest_download Download speed (bits/sec)
# TYPE speedtest_download gauge
speedtest_download ${test.download}
# HELP speedtest_upload Upload speed (bits/sec)
# TYPE speedtest_upload gauge
speedtest_upload ${test.upload}
# HELP speedtest_ping Latency (ms)
# TYPE speedtest_ping gauge
speedtest_ping ${test.ping}
# HELP speedtest_server_distance Remote server distance (km)
# TYPE speedtest_server_distance gauge
speedtest_server_distance ${test.server.d}
# HELP speedtest_server Remote server info
# TYPE speedtest_server gauge
speedtest_server{name="${test.server.name}",country="${test.server.country}",id="${test.server.id}"} 1
# HELP speedtest_bytes_sent Sent bytes (b)
# TYPE speedtest_bytes_sent gauge
speedtest_bytes_sent ${test.bytes_sent}
# HELP speedtest_bytes_received Received bytes (b)
# TYPE speedtest_bytes_received gauge
speedtest_bytes_received ${test.bytes_received}
# HELP speedtest_isp_rating ISP rating
# TYPE speedtest_isp_rating gauge
speedtest_isp_rating ${test.client.isprating}
      `.trim()
      );
    });
  } else {
    res.writeHead(404);
    res.end("");
  }
};

const server = http.createServer(requestListener);
server.listen(port, () => {
  log(`Listening on port ${port}`);
});
