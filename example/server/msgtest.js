var CMD_TEST = 'test';

var WebSocketServer = require('websocket').server;
var http = require('http');


var clients = [];

var server = http.createServer(function(request, response) {
});

server.listen(8082, function() {
	console.log( 'Server is listening on port 8082' );
});

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});


function sendCallback(err) {
    if (err) console.error('send() error: ' + err);
}

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {

	console.log(' Connection from origin ' + request.origin + '.');

	var connection = request.accept(null, request.origin);
	console.log(' Connection ' + connection.remoteAddress);

	//for tests
	clients.push(connection);
   
   // This is the most important callback for us, we'll handle
   // all messages from users here.
   connection.on('message', function(message) {

		if (message.type === 'utf8') {
			console.log(' Received Message ' + message.utf8Data);

			var msg;

			try { 					
				msg = JSON.parse( message.utf8Data );
			}
	   	catch( error )
			{
				console.log( 'non-json message' );
				//send error
				connection.close();
				return;
			}

			console.log('command:' + msg.command );

			if( msg.command == CMD_TEST )
			{
				handleTest( msg, connection );			
				return;
			}
   	} else
		{
			//TODO - handle non-utf8 message
			console.log( 'non-utf8 message' );

			//send error
			connection.close();
			return;
			
		}
	});
    
	connection.on('close', function(connection) {

		clients.splice(clients.indexOf(connection), 1);

		// close user connection
		console.log(' Peer disconnected.');        

	});

});


function handleTest(msg, connection )
{


	console.log( 'test: user looking for pair' );

	//find peer connection

	var pos = Math.floor(Math.random()*(clients.length-1));

	console.log( 'test: sending to %s', pos );
	
	clients[pos].send( JSON.stringify(msg), sendCallback);									

}  //msg command test

