var http = require('follow-redirects').http;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
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
  
  var req = http.request(options, function (response) {
    var chunks = [];
  
    response.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    response.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      //console.log(body.toString());
      //var data = JSON.parse(body.toString()); 
      res.status(200).send(JSON.parse(body.toString()));
      //console.log(data.statistics[0].ports[0].bytesReceived);
    });
  
    response.on("error", function (error) {
      console.error(error);
      res.status(503).send(error);
    });
  });
  
  req.end();
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
    
    var req = http.request(options, function (response) {
      var chunks = [];
    
      response.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      response.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        //console.log(body.toString());
        //var data = JSON.parse(body.toString()); 
        res.status(200).send(JSON.parse(body.toString()));
        //console.log(data.statistics[0].ports[0].bytesReceived);
      });
    
      response.on("error", function (error) {
        console.error(error);
        res.status(503).send(error);
      });
    });
    
    req.end();
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
    
    var req = http.request(options, function (response) {
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

    req.end();
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
    
    var req = http.request(options, function (response) {
      var chunks = [];
    
      response.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      response.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        //console.log(body);
        res.status(200).send({
          message: `${name} is Deactivated`});
      });
    
      response.on("error", function (error) {
        console.error(error);
        res.status(503).send(error);
      });
    });

    req.end();
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
    
    var req = http.request(options, function (response) {
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
    
    req.end();
  };