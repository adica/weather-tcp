const net = require('net');
const settings = require('./settings.json');


const client = new net.Socket();
client.setKeepAlive(true);
const city = process.argv[2];

client.connect(settings.PORT, settings.HOST, function() {

    //console.log('CONNECTED TO: ' + settings.HOST + ':' + settings.PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
    const query = {
      action: 'getForecast',
      city: city
    }
    client.write(JSON.stringify(query));

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    var parsed = JSON.parse(data); 
    var presentation = {
        'name' : parsed.name,
        'weather' : parsed.weather[0].main,
        'weather-descriotion' : parsed.weather[0].description,
        'temperature-min' : parsed.main.temp_min,
        'temperature-max' : parsed.main.temp_max
    }
    console.log(JSON.stringify(presentation,null, 4));
    
    // Close the client socket completely
    client.destroy();

});


// Add a 'close' event handler for the client socket
client.on('close', function() {
    //console.log('Connection closed');
});

