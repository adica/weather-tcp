const settings = require('./settings.json');
const http = require('http');
const path = require('path');
const fs = require('fs');

const appid = fs.readFileSync(path.join(__dirname,'api-key'), 'utf8').trim();

var options = {
  port: 80,
  hostname: settings.apiAddress,
  method: 'GET'
};

var forCity = exports.forCity = function forCity (city, callback){
  city = encodeURIComponent(city);
  options.path = `/data/2.5/weather?q=${city}&units=metric&appid=${appid}`;
  console.log(options.path);
  const req = http.request(options, (res)=>{
    var buffer = []
    res.on('data', (d) => {
      buffer.push(d);
    });
    res.on('end', ()=>{
      callback(null, JSON.parse(buffer.join('')));
    });
    res.on('error', (err)=>{
      callback(err);
    });
  });
  req.end();
}

/*for testing
forCity('Tel Aviv',function (err, data) {
	console.log(data)
})*/