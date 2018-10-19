var http = require("http")
var stream = require('stream')
var request = require('request')
var fs = require('fs')
var util = require('util')

function FalseStream() {
  stream.Stream.call(this)
  this.writable = true
}
util.inherits(FalseStream, stream.Stream)
FalseStream.prototype.write = function() { return true }
FalseStream.prototype.end = function() { this.emit('end') }

http.createServer(function (req, res) {
  var start = Date.now()
  req.pipe(new FalseStream())
  req.on('end', function() {
    console.log(Date.now() - start)
  })  
}).listen(8080)

fs.createReadStream(/*process.argv[2]*/ './backpress.txt')
.pipe(request.post('http://localhost:8080'))