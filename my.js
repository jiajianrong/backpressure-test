var fs = require('fs')



for( var x=0; x<100000; x++ ) {

	fs.appendFile('./backpressure.txt', x + '\r\n', 'utf8', function() {console.log(x)});

}

console.log('done')