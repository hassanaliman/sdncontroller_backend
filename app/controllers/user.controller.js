var http = require('follow-redirects').http;

exports.allAccess = (req, res) => {
    res.status(200).send(`<h3 class="mt-3">Control-plane Manager</h3>`);
  };
  
exports.userBoard = (req, res) => {
  var options = {
    'method': 'GET',
    'hostname': '192.168.137.10',
    'port': 8181,
    'path': '/onos/v1/statistics/delta/ports',
    'headers': {
      'Authorization': 'Basic b25vczpyb2Nrcw=='
    },
    'maxRedirects': 20
  };
  
  var request = http.request(options, function (response) {
    var chunks = [];
  
    response.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    response.on("end", function () {
      var body = Buffer.concat(chunks);
      res.status(200).send(JSON.parse(body.toString()));
    });
  
    response.on("error", function (error) {
      console.error(error);
      res.status(503).send(error);
    });
  });
  
  request.end();
};
  
  exports.adminBoard = (req, res) => {
    var options = {
      'method': 'GET',
      'hostname': '192.168.137.10',
      'port': 8181,
      'path': '/onos/v1/applications',
      'headers': {
        'Authorization': 'Basic b25vczpyb2Nrcw=='
      },
      'maxRedirects': 20
    };
    
    var request = http.request(options, function (response) {
      var chunks = [];
    
      response.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      response.on("end", function () {
        var body = Buffer.concat(chunks); 
        res.status(200).send(JSON.parse(body.toString()));
      });
    
      response.on("error", function (error) {
        console.error(error);
        res.status(503).send(error);
      });
    });
    
    request.end();
  };

  exports.activateApp = (req, res) => {
    var options = {
      'method': 'POST',
      'hostname': '192.168.137.10',
      'port': 8181,
      'path': `/onos/v1/applications/${req.body.name}/active`,
      'headers': {
        'Authorization': 'Basic b25vczpyb2Nrcw=='
      },
      'maxRedirects': 20
    };
    
    var request = http.request(options, function (response) {
      var chunks = [];
    
      response.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      response.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        res.status(200).send(JSON.parse(body.toString()));
      });
    
      response.on("error", function (error) {
        console.error(error);
        res.status(503).send(error);
      });
    });

    request.end();
  }

  exports.deActivateApp = (req, res) => {
    var name = req.body.name;
    console.log(name)
    var options = {
      'method': 'DELETE',
      'hostname': '192.168.137.10',
      'port': 8181,
      'path': `/onos/v1/applications/${name}/active`,
      'headers': {
        'Authorization': 'Basic b25vczpyb2Nrcw=='
      },
      'maxRedirects': 20
    };
    
    var request = http.request(options, function (response) {
      var chunks = [];
    
      response.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      response.on("end", function () {
        var body = Buffer.concat(chunks);
        res.status(200).send({
          message: `${name} is Deactivated`});
      });
    
      response.on("error", function (error) {
        console.error(error);
        res.status(503).send(error);
      });
    });

    request.end();
  }

  exports.getDevice = (req, res) => {
    var options = {
      'method': 'GET',
      'hostname': '192.168.137.10',
      'port': 8181,
      'path': '/onos/v1/devices',
      'headers': {
        'Authorization': 'Basic b25vczpyb2Nrcw=='
      },
      'maxRedirects': 20
    };
    
    var request = http.request(options, function (response) {
      var chunks = [];
    
      response.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      response.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        res.status(200).send(JSON.parse(body.toString()));
      });
    
      response.on("error", function (error) {
        console.error(error);
        res.status(503).send(error);
      });
    });
    
    request.end();
  };

  exports.portconfig = (req, res) => {
    var deviceId = req.body.id;
    var portNum = req.body.port;
    var portName = req.body.name;
    var postData = {
      "interfaces": [
        {
          "name": `${portName}`
        }
      ]
    }

    var options = {
      'method': 'POST',
      'hostname': '192.168.137.10',
      'port': 8181,
      'path': `/onos/v1/network/configuration/ports/${encodeURIComponent(deviceId+"/"+portNum)}`,
      'headers': {
        'Authorization': 'Basic b25vczpyb2Nrcw=='
      },
      'maxRedirects': 20
    };

    var request = http.request(options, function (response) {
      var chunks = [];
    
      response.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      response.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        res.status(200).send({
          message: `${deviceId+"/"+portNum} is Configured`});
      });
    
      response.on("error", function (error) {
        console.error(error);
      });
    });

    request.write(JSON.stringify(postData));

    request.end();
  }

  exports.getConfig = (req, res) => {
    var options = {
      'method': 'GET',
      'hostname': '192.168.137.10',
      'port': 8181,
      'path': '/onos/v1/network/configuration',
      'headers': {
        'Authorization': 'Basic b25vczpyb2Nrcw=='
      },
      'maxRedirects': 20
    };
    
    var request = http.request(options, function (response) {
      var chunks = [];
    
      response.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      response.on("end", function () {
        var body = Buffer.concat(chunks);
        res.status(200).send(JSON.parse(body.toString()));
      });
    
      response.on("error", function (error) {
        console.error(error);
        res.status(503).send(error);
      });
    });
    
    request.end();
  };

  exports.portdelete = (req, res) => {
    var port = req.body.portId;
    console.log(port)
    var options = {
      'method': 'DELETE',
      'hostname': '192.168.137.10',
      'port': 8181,
      'path': `/onos/v1/network/configuration/ports/${encodeURIComponent(port)}`,
      'headers': {
        'Authorization': 'Basic b25vczpyb2Nrcw=='
      },
      'maxRedirects': 20
    };
    
    var request = http.request(options, function (response) {
      var chunks = [];
    
      response.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      response.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        //console.log(body);
        res.status(200).send({
          message: `${port} is Deleted`});
      });
    
      response.on("error", function (error) {
        console.error(error);
        res.status(503).send(error);
      });
    });

    request.end();
  }

  exports.vplsconfig = (req, res) => {
    var vplsName = req.body.name;

    console.log(vplsName);

    var postData = {
      "vpls":[
        {
            "name":`${vplsName}`
           
        }
    ]
    }

    var options = {
      'method': 'POST',
      'hostname': '192.168.137.10',
      'port': 8181,
      'path': "/onos/vpls/vpls",
      'headers': {
        'Authorization': 'Basic b25vczpyb2Nrcw=='
      },
      'maxRedirects': 20
    };
  
    var request = http.request(options, function (response) {
      var chunks = [];
    
      response.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      response.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        res.status(200).send({
          message: `${vplsName} is Configured`});
      });
    
      response.on("error", function (error) {
        console.error(error);
      });
    });

    request.write(JSON.stringify(postData));

    request.end();
  }

  exports.vplsportconfig = (req, res) => {
    var portName = req.body.portName;
    var portNum  = req.body.port;
    var deviceId = req.body.deviceId;
    var vplsName = req.body.vplsName;


    var postData = {
      "interfaces":[
        {
            "name":`${portName}`,
           "connect point":`${deviceId+"/"+portNum}`
        }
    ]
    }

    var options = {
      'method': 'POST',
      'hostname': '192.168.137.10',
      'port': 8181,
      'path': `/onos/vpls/vpls/interfaces/${vplsName}`,
      'headers': {
        'Authorization': 'Basic b25vczpyb2Nrcw=='
      },
      'maxRedirects': 20
    };
  
    var request = http.request(options, function (response) {
      var chunks = [];
    
      response.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      response.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        res.status(200).send({
          message: `${portName} is Configured`});
      });
    
      response.on("error", function (error) {
        console.error(error);
      });
    });

    request.write(JSON.stringify(postData));

    request.end();
  }

  exports.vplsList = (req, res) => {
    var options = {
      'method': 'GET',
      'hostname': '192.168.137.10',
      'port': 8181,
      'path': "/onos/vpls/vpls",
      'headers': {
        'Authorization': 'Basic b25vczpyb2Nrcw=='
      },
      'maxRedirects': 20
    };
  
    var request = http.request(options, function (response) {
      var chunks = [];
    
      response.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      response.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        res.status(200).send(body.toString());
      });
    
      response.on("error", function (error) {
        console.error(error);
      });
    });

    request.end();
  }

  exports.delVpls = (req, res) => {
    var vplsName = req.body.name;
    var options = {
      'method': 'DELETE',
      'hostname': '192.168.137.10',
      'port': 8181,
      'path': `/onos/vpls/vpls/${vplsName}`,
      'headers': {
        'Authorization': 'Basic b25vczpyb2Nrcw=='
      },
      'maxRedirects': 20
    };
    
    var request = http.request(options, function (response) {
      var chunks = [];
    
      response.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      response.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        //console.log(body);
        res.status(200).send({
          message: `${vplsName} is Deleted`});
      });
    
      response.on("error", function (error) {
        console.error(error);
        res.status(503).send(error);
      });
    });

    request.end();
  }

  exports.getHost = (req, res) => {
    var options = {
      'method': 'GET',
      'hostname': '192.168.137.10',
      'port': 8181,
      'path': "/onos/v1/hosts",
      'headers': {
        'Authorization': 'Basic b25vczpyb2Nrcw=='
      },
      'maxRedirects': 20
    };
  
    var request = http.request(options, function (response) {
      var chunks = [];
    
      response.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      response.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        res.status(200).send(body.toString());
      });
    
      response.on("error", function (error) {
        console.error(error);
      });
    });

    request.end();
  }