exports.name = 'My scenario test';

exports.description = 'NodeJS tester';

exports.path = '';

exports.init = function (ws, api) {
    ws.on('message', function (message) {

		api.checkpoint('> ' + message);

		var msg = JSON.parse( message );
		var value = parseInt(msg.value, 10 ) + 1;

		var tm = Math.floor( Math.random() * ( 1 + 3 - 1 ) ) + 1;

		api.checkpoint('> tm: ' + tm);

		if( value > 100 )			
			setTimeout( function() {msend( ws, value, true );}, tm*1000);
		else
			setTimeout( function() {msend( ws, value, false );}, tm*1000);
		

    });

	var msg = { 'command': 'test', 'value': '1' } ;
	try {
		ws.send( JSON.stringify(msg) );
	} catch ( error )
	{
	}

};

function msend( ws, value, drop )
{
		try {
			var msg = { 'command': 'test', 'value': value } ;
			ws.send( JSON.stringify(msg) );
		} catch ( error )
		{
		}

		if( drop )
		{
			ws.close();
			return;
		}
}

